/* Starts and controls the AI.
 *
 * Author: Ian Char
 */
"use strict";
var firebase = require('firebase');
var VirtualGrid = require('./VirtualGrid');

function getServiceAccountAuth() {
    firebase.initializeApp({
        serviceAccount: './GridProject-3915f6683dfd.json',
        databaseURL: "https://gridproject-fd25f.firebaseio.com"
    });
}


function main() {
    getServiceAccountAuth();
    var testGrid = new VirtualGrid('-KV2otjtLK1K8LaOsMy-');
}

main();
