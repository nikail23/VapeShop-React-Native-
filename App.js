import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

import AppNavigator from "./navigation/AppNavigator";
import vapeReducer from "./store/reducers/vapes";
import authReducer from "./store/reducers/auth";
// import cartReducer from "./store/reducers/cart";
// import ordersReducer from "./store/reducers/orders";
import rootSaga from "./store/sagas/rootSaga";

const rootReducer = combineReducers({
  vape: vapeReducer,
  // cart: cartReducer,
  // orders: ordersReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
