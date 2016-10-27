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

function testUsage() {
    var testGrid = new VirtualGrid('-KV2otjtLK1K8LaOsMy-');
    setTimeout(function(){ testGrid.setCell(0, 0, [100, 100, 100]); }, 1000);
    setTimeout(function(){ console.log(testGrid.getCell(0, 0)); }, 3000);
    setTimeout(function(){ console.log(testGrid.getDimensions()); }, 5000);
}

function main() {
    getServiceAccountAuth();
    testUsage();
}

main();
