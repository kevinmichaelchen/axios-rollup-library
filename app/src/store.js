import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import { axiosSaga } from "axios-rollup-saga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const initialState = {};

let store;

export default function getStore() {
  if (!store) {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware))
    );
    sagaMiddleware.run(axiosSaga);
  }
  return store;
}
