import { applyMiddleware} from "redux";
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
//import watcherSagas from "./sagas";
import gameReducer from "./reducers/index"

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: gameReducer, 
    middleware: [sagaMiddleware]
});

//sagaMiddleware.run(watcherSagas)

export default store;