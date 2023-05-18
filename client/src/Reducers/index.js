// not required in new redux
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { userReducer } from "./userReducer"

const rootReducer = combineReducers({
    userDetails: userReducer
})
export default rootReducer;
