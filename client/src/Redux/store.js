import { configureStore } from "@reduxjs/toolkit";
import { userDetails } from "../Reducers/userReducer";
import storage from "redux-persist/lib/storage";
import {persistReducer} from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key:"root",
    version:1,
    storage,
};

const reducer = combineReducers({
    user:userDetails
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    
});

export default store;