import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import thunk from "redux-thunk";
import createSagaMiddle from "redux-saga";

const SagaMiddleware = createSagaMiddle();
const middlewares = [logger, thunk, SagaMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
SagaMiddleware.run(rootSaga);
export default store;
