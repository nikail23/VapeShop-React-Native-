import { call, all } from "redux-saga/effects";
import { watchSignup, watchLogin, watchLogout, watchSetDidTryAL } from "./auth";
import { watchFetchVape, watcUpdateVape, watchCreateVape, watchDeleteVape } from "./vapes";
// import { watchFetchOrders, watchAddOrder } from "./orders";
// import { watchAddToCart, watchRemoveFromCart } from "./cart";

export default function* rootSaga() {
  yield all([
    call(watchSignup),
    call(watchLogin),
    call(watchLogout),
    call(watchSetDidTryAL),
    call(watchFetchVape),
    call(watchCreateVape),
    call(watcUpdateVape),
    call(watchDeleteVape),
    // call(watchFetchOrders),
    // call(watchAddOrder),
    // call(watchAddToCart),
    // call(watchRemoveFromCart),
  ]);
}
