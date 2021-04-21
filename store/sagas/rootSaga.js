import { call, all } from "redux-saga/effects";
import { watchSignup, watchLogin, watchLogout, watchSetDidTryAL } from "./auth";
import { watchFetchShmot, watchCreateShmot, watcUpdateShmot, watchDeleteShmot } from "./shmot";
// import { watchFetchOrders, watchAddOrder } from "./orders";
// import { watchAddToCart, watchRemoveFromCart } from "./cart";

export default function* rootSaga() {
  yield all([
    call(watchSignup),
    call(watchLogin),
    call(watchLogout),
    call(watchSetDidTryAL),
    call(watchFetchShmot),
    call(watchCreateShmot),
    call(watcUpdateShmot),
    call(watchDeleteShmot),
    // call(watchFetchOrders),
    // call(watchAddOrder),
    // call(watchAddToCart),
    // call(watchRemoveFromCart),
  ]);
}
