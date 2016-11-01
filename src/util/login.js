import * as firebase from 'firebase';

var communityGridsList = {
    "-KV6ko8ro6TrfSUzAaZ0" : "Community",
    "-KVSqHMKRZHj_KVypN69" : "Game Of Life",
    "-KVSqIeH49GVqrFF6F61" : "Snake"
};

function promptForLogin(uidCallback) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        var user = result.user;
        var uid = user.uid;
        var user_email = user.email;

        // check if account already exists, if not add an entry.
        var accountCheck = firebase.database().ref('users/' + uid);
        accountCheck.once("value", snapshot => {
            if (snapshot.val() === null) {

                snapshot.ref.set({
                    admin: 'false',
                    email: user_email,
                    grids: communityGridsList
                });
            }
        });

        // Pass uid to the specified callback.
        uidCallback(user.uid);
    }).catch(function(error) {
        console.log(error);
    });
}

/* Manages the login for a user, if they are not logged in prompt for a log
 * in.
 *
 * Args:
 *  uidCallback: Callback to be executed with parameter of user id.
 */
export function manageLogin(uidCallback) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            localStorage.setItem("displayName",user.displayName);
            uidCallback(user.uid);
        } else {
            localStorage.setItem("displayName","null");
            promptForLogin(uidCallback);
        }
    });
}

export function signInIfReturning(uidCallback) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            localStorage.setItem("displayName",user.displayName);
            uidCallback(user.uid);
        }
    });
}
