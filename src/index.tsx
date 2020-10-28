import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers/rootReducer'
import './index.css';
import 'materialize-css/dist/js/materialize.min'
import App from './App';
import 'materialize-css/dist/css/materialize.min.css'
import './custom.css'
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDZfqVo4odn78Lmx-vGDi8gzOdrUq2MbT0",
  authDomain: "react-app-68aba.firebaseapp.com",
  databaseURL: "https://react-app-68aba.firebaseio.com",
  projectId: "react-app-68aba",
  storageBucket: "react-app-68aba.appspot.com",
  messagingSenderId: "107199930189",
  appId: "1:107199930189:web:5ad33ecfa7b25a90cce104",
  measurementId: "G-MTQQMLFQVM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app:any;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  }  
})
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
