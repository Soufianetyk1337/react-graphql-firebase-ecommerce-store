import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import thunk from "redux-thunk";
import createSagaMiddle from "redux-saga";
import { persistStore } from "redux-persist";

const SagaMiddleware = createSagaMiddle();
const middlewares = [logger, thunk, SagaMiddleware];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
SagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };
