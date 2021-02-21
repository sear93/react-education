import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {appReducer} from "./appReducer";
import thunk from 'redux-thunk';
import {loadState, saveState} from "./localStorage";

let reducers = combineReducers({
    app: appReducer,
})

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

// const persistedState = loadState();

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// store.subscribe(() => {
//     saveState(store.getState());
// });

export default store;