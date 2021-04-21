import AsyncStorage from "@react-native-community/async-storage";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  setAuthLoading,
  setAuthError,
  authenticate,
  SIGNUP,
  LOGIN,
  LOGOUT,
  logout_succeeded,
  SET_DID_TRY_AL,
  setDidTryALSucceeded,
} from "../actions/auth";
import ENV from "../../env"

export function* watchSignup() {
  yield takeEvery(SIGNUP, SignupAsync);
}

export function* watchLogin() {
  yield takeEvery(LOGIN, LoginAsync);
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, LogoutAsync);
}

export function* watchSetDidTryAL() {
  yield takeEvery(SET_DID_TRY_AL, SetDidTryALAsync);
}

function* SignupAsync({ email, password }) {
  try {
    yield put(setAuthLoading());
    const response = yield call(async () => {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.firebaseApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      if (!res.ok) {
        const errorResData = await res.json();
        const errorId = errorResData.error.message;
        let message = "Something went wrong!";
        if (errorId === "EMAIL_EXISTS") {
          message = "This email exists already!";
        }
        throw new Error(message);
      }
      return await res.json();
    });
    yield put(
      authenticate(
        response.localId,
        response.idToken,
        parseInt(response.expiresIn) * 1000
      )
    );
    
    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.expiresIn) * 1000
    );
    saveDataToStorage(response.idToken, response.localId, expirationDate);
  } catch (err) {
    yield put(setAuthError(err));
  }
}

function* LoginAsync({ email, password }) {
  try {
    yield put(setAuthLoading());
    const response = yield call(async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.firebaseApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = "Something went wrong!";
        if (errorId === "EMAIL_NOT_FOUND") {
          message = "This email could not be found!";
        } else if (errorId === "INVALID_PASSWORD") {
          message = "This password is not valid!";
        }
        throw new Error(message);
      }
      return await response.json();
    });
    yield put(
      authenticate(
        response.localId,
        response.idToken,
        parseInt(response.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.expiresIn) * 1000
    );
    saveDataToStorage(response.idToken, response.localId, expirationDate);
  } catch (err) {
    yield put(setAuthError(err));
  }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

function* LogoutAsync() {
  try {
    yield put(setAuthLoading());
    yield call(() => {
      AsyncStorage.removeItem("userData");
    });
    yield put(logout_succeeded());
  } catch (err) {
    console.log(err);
  }
}

function* SetDidTryALAsync() {
  try {
    yield put(setAuthLoading());
    yield put(setDidTryALSucceeded());
  } catch (err) {
    console.log(err);
  }
}
