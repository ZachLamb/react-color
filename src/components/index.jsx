import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import * as firebase from 'firebase';
import {manageLogin} from '../util/login.js'

const config = {
    apiKey: "AIzaSyAzPSc-CtNCs0zbU0KkIu5NzcRFnhkeabo",
    authDomain: "gridproject-fd25f.firebaseapp.com",
    databaseURL: "https://gridproject-fd25f.firebaseio.com",
    storageBucket: "gridproject-fd25f.appspot.com",
    messagingSenderId: "187144675114"
};
firebase.initializeApp(config);

manageLogin(function(uid) { console.log(uid); });

render(<App/>, document.querySelector("#app"));
