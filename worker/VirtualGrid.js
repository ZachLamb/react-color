/* Author: Ian Char
 *
 * Creates a virtual grid in which we can observer cell values and set cell
 * values. The changes will then be reflected in the actual database.
 */
var firebase = require('firebase');

var NUM_ROWS = 'numRows/';
var NUM_COLS = 'numCols/';

class VirtualGrid {
    constructor(gridId) {
        this.gridId = gridId;
        this.grid = this._setUpGrid(gridId);
    }

    /* Set a cell value.
     *
     * Args:
     *  row: Row of the cell as an integer.
     *  col: Column of the cell as an integer.
     *  color: Color to set to represented as a list of 3 values 0-255.
     */
    setCell(row, col, color) {
    }

    /* Gets a cell value.
     *
     * Args:
     *  row: Row of the cell as an integer.
     *  col: Column of the cell as an integer.
     *
     * Returns: The color value of the cell represented as a list of three
     *  values from 0-255.
     */
    getCell(row, col) {
    }

    /* Sets up the grid by creating nested list data structure and attaching
     * handlers for updates.
     *
     * Args:
     *  gridId: The id of the grid in firebase.
     */
    _setUpGrid(gridId) {
        var gridPath = '/grids/' + gridId + '/';
        var rowNumRef = firebase.database().ref(gridPath + NUM_ROWS);
        var colNumRef = firebase.database().ref(gridPath + NUM_COLS);
        var matrix = []

        // Functions to install the necessary.
        var installHandlers = function(matrix) {
            var numRows = matrix.length;
            var numCols = matrix[0].length;
            for (var r = 0; r < numRows; r++) {
                for (var c = 0; c < numCols; c++) {
                    //Install handler here.
                }
            }
        }

        // Fetch rows and columns and then install handlers.
        rowNumRef.once('value', function(rowNumSnapshot) {
             for (var i = 0; i < rowNumSnapshot.val() i++) {
                 matrix.push([]);
             }
             colNumRef.once('value', function(colNumSnapshot) {
                 dimensions[COL_KEY] = colNumSnapshot.val();
                 callback();
             }, function(err) {
                 console.log(err);
             });
        }, function (err) {
            console.log(err)
        });

    }
}
