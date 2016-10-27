/* Starts and controls the AI.
 *
 * Author: Ian Char
 */
"use strict";
var firebase = require('firebase');
var VirtualGrid = require('./VirtualGrid');
var SnakeAI = require('./AI_Modules/SnakeAI');

function getServiceAccountAuth() {
    firebase.initializeApp({
        serviceAccount: './GridProject-3915f6683dfd.json',
        databaseURL: "https://gridproject-fd25f.firebaseio.com"
    });
}

function testUsage() {
    var testGrid = new VirtualGrid('-KV3XBS8fhEMXeGPX26s');
    setTimeout(function(){ testGrid.setCell(0, 0, [100, 100, 100]); }, 1000);
    setTimeout(function(){ console.log(testGrid.getCell(0, 0)); }, 3000);
    setTimeout(function(){ console.log(testGrid.getDimensions()); }, 5000);
}

function runSnake() {
    var snake = new SnakeAI();
    setTimeout(function(){ snake.run(); }, 5000);
}

function main() {
    getServiceAccountAuth();
    //testUsage();
    runSnake();
}

main();
