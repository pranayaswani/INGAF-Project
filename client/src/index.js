import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux';
//import rootReducer from './Reducers';
import store from './Redux/store'
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
//npm install @reduxjs/toolkit


// const store = configureStore({
//   reducer: rootReducer
// })
const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <BrowserRouter>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

