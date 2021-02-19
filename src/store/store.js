import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {appReducer} from "./appReducer";
import thunk from 'redux-thunk';
import {loadState, saveState} from "./localStorage";

let reducers = combineReducers({
    app: appReducer,
})

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

// const persistedState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : [];

const persistedState = loadState();

let store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));

// store.subscribe(() => {
//     localStorage.setItem('state', JSON.stringify(store.getState()));
// })

store.subscribe(() => {
    saveState(store.getState());
});

export default store;