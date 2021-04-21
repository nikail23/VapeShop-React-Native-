import Shmot from "../../models/shmot";
import { select, call, put, takeEvery } from "redux-saga/effects";

import {
  requestedShmotLoading,
  FETCH_SHMOT,
  fetchShmotSucceeded,
  CREATE_SHMOT,
  createShmotSucceeded,
  UPDATE_SHMOT,
  updateShmotSucceeded,
  DELETE_SHMOT,
  deleteShmotSucceeded,
  setFilters,
} from "../actions/shmot";

import firebase from "firebase";
import ENV from "../../env";

if (!firebase.apps.length) {
  firebase.initializeApp(ENV.firebaseConfig);
} else {
  firebase.app();
}

const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(Date.parse(new Date()).toString());
  await ref.put(blob);
  return ref.getDownloadURL();
};

const uploadImages = async (uriArray) => {
  const newUrlArray = [];
  for (const uri of uriArray) {
    if (uri.startsWith("file")) {
      const res = await uploadImage(uri);
      newUrlArray.push(res);
    } else {
      newUrlArray.push(uri);
    }
  }
  return newUrlArray;
};

const getUserId = (state) => state.auth.userId;
const getToken = (state) => state.auth.token;

export function* watchFetchShmot() {
  yield takeEvery(FETCH_SHMOT, FetchShmotAsync);
}

export function* watchCreateShmot() {
  yield takeEvery(CREATE_SHMOT, CreateShmotAsync);
}

export function* watcUpdateShmot() {
  yield takeEvery(UPDATE_SHMOT, UpdateShmotAsync);
}

export function* watchDeleteShmot() {
  yield takeEvery(DELETE_SHMOT, DeleteShmotAsync);
}

function* FetchShmotAsync() {
  try {
    yield put(requestedShmotLoading());
    const response = yield call(async () => {
      const response = await fetch(
        "https://rn-shmot-app-aafab-default-rtdb.firebaseio.com/shmot.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong if fetchProducts!");
      }
      const resData = await response.json();
      const loadedShmot = [];
      for (const key in resData) {
        loadedShmot.push(
          new Shmot(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrls,
            resData[key].videoUrl,
            resData[key].shmotType,
            resData[key].color,
            resData[key].description,
            resData[key].price,
            resData[key].selectedLocation
          )
        );
      }
      return loadedShmot;
    });
    const userId = yield select(getUserId);
    yield put(
      fetchShmotSucceeded(
        response,
        response.filter((shmot) => shmot.ownerId === userId)
      )
    );
    yield put(setFilters());
  } catch (err) {
    console.log(err);
  }
}

function* CreateShmotAsync({
  title,
  imageUrls,
  videoUrl,
  shmotType,
  color,
  selectedLocation,
  price,
  description,
}) {
  try {
    yield put(requestedShmotLoading());
    const token = yield select(getToken);
    const userId = yield select(getUserId);
    let loadedImageUrls;
    const response = yield call(async () => {
      loadedImageUrls = await uploadImages(imageUrls);
      const response = await fetch(
        `https://rn-shmot-app-aafab-default-rtdb.firebaseio.com/shmot.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            imageUrls: loadedImageUrls,
            videoUrl,
            shmotType,
            color,
            selectedLocation,
            price,
            description,
            ownerId: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return await response.json();
    });
    yield put(
      createShmotSucceeded(
        response.name,
        title,
        loadedImageUrls,
        videoUrl,
        shmotType,
        color,
        selectedLocation,
        price,
        description,
        userId
      )
    );
    yield put(setFilters());
  } catch (err) {
    console.log(err);
  }
}

function* UpdateShmotAsync({
  id,
  title,
  imageUrls,
  videoUrl,
  shmotType,
  color,
  selectedLocation,
  description,
}) {
  try {
    yield put(requestedShmotLoading());
    const token = yield select(getToken);
    let loadedImageUrls;
    yield call(async () => {
      loadedImageUrls = await uploadImages(imageUrls);
      const response = await fetch(
        `https://rn-shmot-app-aafab-default-rtdb.firebaseio.com/shmot/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            imageUrls,
            videoUrl,
            shmotType,
            color,
            description,
            selectedLocation,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    });

    yield put(
      updateShmotSucceeded(id, {
        title,
        imageUrls,
        videoUrl,
        shmotType,
        color,
        description,
        selectedLocation,
      })
    );
    yield put(setFilters());
  } catch (err) {
    console.log(err);
  }
}

function* DeleteShmotAsync({ shmotId }) {
  try {
    yield put(requestedShmotLoading());
    const token = yield select(getToken);
    yield call(async () => {
      const response = await fetch(
        `https://rn-shmot-app-aafab-default-rtdb.firebaseio.com/shmot/${shmotId}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    });
    yield put(deleteShmotSucceeded(shmotId));
    yield put(setFilters());
  } catch (err) {
    console.log(err);
  }
}
