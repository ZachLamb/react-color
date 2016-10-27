/* A snake AI that will interact with obstacles on the grid.
 *
 * Author: Ian Char
 */
"use strict";

var VirtualGrid = require('../VirtualGrid');

const GRID_ID = '-KV3XBS8fhEMXeGPX26s';
const SNAKE_LENGTH = 5;
const SNAKE_COLOR = [140, 255, 0];
const SNAKE_SPEED_MS = 500;

// Directions
const RIGHT = 0;
const UP = 1;
const LEFT = 2;
const DOWN = 3;

class SnakeAI {
    constructor() {
        this.grid = new VirtualGrid(GRID_ID);
        this.queue = [];
        this.currDirection = UP;
    }

    /* Runs the AI continuously.*/
    run() {
        // Pick a random square to start at.
        var dimensions = this.grid.getDimensions();
        var randRow = Math.floor(dimensions[0] * Math.random());
        var randCol = Math.floor(dimensions[1] * Math.random());
        this.queue.push([randRow, randCol]);
        this.grid.setCell(randRow, randCol, SNAKE_COLOR);

        var self = this;
        setInterval(function(){ self._makeMove() }, SNAKE_SPEED_MS);
    }

    /* Makes one move for the snake.*/
    _makeMove() {
        var nextCell = this._findNextMove();
        if (nextCell !== null) {
            this._moveSnake(nextCell[0], nextCell[1]);
        }
    }

    /* Move the snake to a new position and remove the tail if applicable.
     *
     * Args:
     *  row: The row index to move the snake to.
     *  col: The col index to move the snake to.
     */
    _moveSnake(row, col) {
        // Remove the tail.
        if (this.queue.length >= SNAKE_LENGTH) {
            var tail = this.queue.shift();
            this.grid.setCell(tail[0], tail[1], [255, 255, 255]);
        }

        // Move the snake to the next position.
        this.queue.push([row, col]);
        this.grid.setCell(row, col, SNAKE_COLOR);
    }

    /* Finds a cell for the snake to move to.
     *
     * Returns: The coordinate of the cell as [row, col]. If there is no
     *  available move returns null.
     */
    _findNextMove() {
        var currPosn = this.queue[this.queue.length - 1];

        // Find absolute directions.
        var absDirs = [];
        absDirs.push((this.currDirection + 1) % 4);
        absDirs.push(this.currDirection);
        if (this.currDirection - 1 < 0) {
            absDirs.push(DOWN);
        } else {
            absDirs.push(this.currDirection - 1);
        }

        // Get the options for the cells we could move to.
        var options = [];
        var numNull = 0;
        for (var i = 0; i < 3; i++) {
            var potential = this._getTurnDir(currPosn[0], currPosn[1],
                    absDirs[i]);
            if (potential === null) {
                numNull++;
            }
            options.push(potential);
        }
        if (numNull === 3) {
            return null;
        }
        // Pick a random direction to go to, weighting forward higher.
        var randNum = Math.random();
        if (randNum < 0.5) {
            if (options[1] !== null) {
                return options[1];
            } else {
                randNum = Math.random() / 2 + 0.5;
            }
        }
        if (randNum < 0.75) {
            if (options[0] !== null) {
                this.currDirection = (this.currDirection + 1) % 4;
                return options[0];
            }
        }
        if (options[2] !== null) {
            if (this.currDirection - 1 < 0) {
                this.currDirection = DOWN;
            } else {
                this.currDirection--;
            }
            return options[2];
        } else if (options[1] !== null) {
            return options[1];
        } else {
            this.currDirection = (this.currDirection + 1) % 4;
            return options[0];
        }
    }

    /* Finds the next cell given the direction, if out of bounds or the cell is
     * not white then return null.
     *
     * Args:
     *  row: The row of the cell we are currently at.
     *  col: The col of the cell we are currently at.
     *  dir: The direction from the cell we are looking at.
     */
    _getTurnDir(row, col, dir) {
        var dimensions = this.grid.getDimensions();
        var nextCell = [-1, -1];
        if (dir === RIGHT) {
            nextCell = [row, col + 1];
        } else if (dir === UP) {
            nextCell = [row - 1, col];
        } else if (dir === LEFT) {
            nextCell = [row, col - 1];
        } else if (dir === DOWN) {
            nextCell = [row + 1, col];
        }

        if (nextCell[0] < 0 || nextCell[0] >= dimensions[0]) {
            return null;
        }
        if (nextCell[1] < 0 || nextCell[1] >= dimensions[1]) {
            return null;
        }
        var nextColor = this.grid.getCell(nextCell[0], nextCell[1]);
        if (nextColor[0] !== 255 || nextColor[1] !== 255
                || nextColor[2] !== 255) {
            return null;
        }
        return nextCell;
    }
}

module.exports = SnakeAI;
