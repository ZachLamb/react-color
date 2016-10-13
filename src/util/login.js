import * as firebase from 'firebase';

function promptForLogin(uidCallback) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        uidCallback(user.uid);
    }).catch(function(error) {
        console.log(error);
    });
}

export function manageLogin(uidCallback) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uidCallback(user.uid);
        } else {
            promptForLogin(uidCallback);
        }
    });
}


