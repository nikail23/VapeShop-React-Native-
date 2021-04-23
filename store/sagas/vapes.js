import Vape from "../../models/vape";
import { select, call, put, takeEvery } from "redux-saga/effects";

import {
  requestedVapeLoading,
  FETCH_VAPE,
  fetchVapeSucceeded,
  CREATE_VAPE,
  createVapeSucceeded,
  UPDATE_VAPE,
  updateVapeSucceeded,
  DELETE_VAPE,
  deleteVapeSucceeded,
  setFilters,
} from "../actions/vapes";

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

export function* watchFetchVape() {
  yield takeEvery(FETCH_VAPE, FetchVapeAsync);
}

export function* watchCreateVape() {
  yield takeEvery(CREATE_VAPE, CreateVapeAsync);
}

export function* watcUpdateVape() {
  yield takeEvery(UPDATE_VAPE, UpdateVapeAsync);
}

export function* watchDeleteVape() {
  yield takeEvery(DELETE_VAPE, DeleteVapeAsync);
}

function* FetchVapeAsync() {
  try {
    yield put(requestedVapeLoading());
    const response = yield call(async () => {
      const response = await fetch(
        "https://vapeshop-3a628-default-rtdb.firebaseio.com/Vapes.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong if fetchProducts!");
      }
      const resData = await response.json();
      const loadedVape = [];
      for (const key in resData) {
        loadedVape.push(
          new Vape(
            key,
            resData[key].OwnerId,
            resData[key].Name,
            resData[key].Description,
            resData[key].ImageUrls,
            resData[key].VideoUrl,
            resData[key].Cost,
            resData[key].Weight,
            resData[key].BatteryPower,
            resData[key].SelectedLocation
          )
        );
      }
      return loadedVape;
    });
    const userId = yield select(getUserId);
    yield put(
      fetchVapeSucceeded(
        response,
        response.filter((vape) => vape.ownerId === userId)
      )
    );
    yield put(setFilters());
  } catch (err) {
    console.log(err);
  }
}

function* CreateVapeAsync({
  name,
  description,
  imageUrls,
  videoUrl,
  selectedLocation,
  price,
  weight,
  battery
}) {
  try {
    yield put(requestedVapeLoading());
    const token = yield select(getToken);
    const userId = yield select(getUserId);
    let loadedImageUrls;
    const response = yield call(async () => {
      loadedImageUrls = await uploadImages(imageUrls);
      const response = await fetch(
        `https://vapeshop-3a628-default-rtdb.firebaseio.com/Vapes.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: name,
            ImageUrls: loadedImageUrls,
            VideoUrl: videoUrl,
            SelectedLocation: selectedLocation,
            Cost: price,
            Description: description,
            OwnerId: userId,
            Weight: weight,
            BatteryPower: battery
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return await response.json();
    });
    yield put(
      createVapeSucceeded(
        response.name,
        name,
        loadedImageUrls,
        videoUrl,
        selectedLocation,
        price,
        description,
        userId,
        weight,
        battery
      )
    );
    yield put(setFilters());
  } catch (err) {
    console.log(err);
  }
}

function* UpdateVapeAsync({
  id,
  name,
  imageUrls,
  videoUrl,
  selectedLocation,
  price,
  weight,
  battery,
  description,
}) {
  try {
    yield put(requestedVapeLoading());
    const token = yield select(getToken);
    let loadedImageUrls;
    yield call(async () => {
      loadedImageUrls = await uploadImages(imageUrls);
      const response = await fetch(
        `https://vapeshop-3a628-default-rtdb.firebaseio.com/Vapes/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: name,
            Description: description,
            ImageUrls: imageUrls,
            VideoUrl: videoUrl,
            Cost: price,
            Weight: weight,
            BatteryPower: battery,
            SelectedLocation: selectedLocation,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    });

    yield put(
      updateVapeSucceeded(id, {
        name,
        description,
        imageUrls,
        videoUrl,
        price,
        weight,
        battery,
        selectedLocation,
      })
    );
    yield put(setFilters());
  } catch (err) {
    console.log(err);
  }
}

function* DeleteVapeAsync({ vapeId: vapeId }) {
  try {
    yield put(requestedVapeLoading());
    const token = yield select(getToken);
    yield call(async () => {
      const response = await fetch(
        `https://vapeshop-3a628-default-rtdb.firebaseio.com/Vapes/${vapeId}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    });
    yield put(deleteVapeSucceeded(vapeId));
    yield put(setFilters());
  } catch (err) {
    console.log(err);
  }
}
