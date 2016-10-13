import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAzPSc-CtNCs0zbU0KkIu5NzcRFnhkeabo",
    authDomain: "gridproject-fd25f.firebaseapp.com",
    databaseURL: "https://gridproject-fd25f.firebaseio.com",
    storageBucket: "gridproject-fd25f.appspot.com",
    messagingSenderId: "187144675114"
};
firebase.initializeApp(config);

// For now we do anonymous loggin.
// firebase.auth().signInAnonymously().catch(function(error) {
//     console.log('Could not auth', error);
// });

function promptLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(token);
        console.log(user);
    }).catch(function(error) {
        console.log(error);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user is signed in");
        console.log(user);
    } else {
        console.log("NO USER");
        promptLogin();
    }
});

render(<App/>, document.querySelector("#app"));
