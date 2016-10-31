"use strict";
var VirtualGrid = require('./VirtualGrid');
var _ = require('lodash');

function numberCellNeighbors(gameOfLifeGrid, row, col)
{
    var numNeighbors = 0;
    var gridDimensions = gameOfLifeGrid.getDimensions();
    var maxRow = gridDimensions[0];
    var maxCol = gridDimensions[1];

    if(row !== 0)
    {
        for(var i = -1; i < 2; i++)
        {
            var colToCheck = col + i;
            if(colToCheck >= 0 && colToCheck < maxCol && _.without(gameOfLifeGrid.getCell(row - 1, colToCheck), 255).length !== 0)
            {
                numNeighbors++;
            }
        }
    }

    if(row !== maxRow - 1)
    {
        for(var i = -1; i < 2; i++)
        {
            var colToCheck = col + i;
            if(colToCheck >= 0 && colToCheck < maxCol && _.without(gameOfLifeGrid.getCell(row + 1, colToCheck), 255).length !== 0)
            {
                numNeighbors++;
            }
        }
    }

    if(col !== 0)
    {
        if(_.without(gameOfLifeGrid.getCell(row, col - 1), 255).length !== 0)
        {
            numNeighbors++;
        }
    }

    if(col !== maxCol - 1)
    {
        if(_.without(gameOfLifeGrid.getCell(row, col + 1), 255).length !== 0)
        {
            numNeighbors++;
        }
    }

    return numNeighbors;
}

function EvaluateGrid(gameOfLifeGrid)
{
    var dead = [255,255,255];
    var alive = [0, 0, 0];

    let cellsToKill = [];
    let cellsToBringToLife = [];

    var gridDimensions = gameOfLifeGrid.getDimensions();

    for(var rowIterator = 0; rowIterator < gridDimensions[0]; rowIterator++)
    {
        for(var colIterator = 0; colIterator < gridDimensions[1]; colIterator++)
        {
            let currentCellAlive = false;
            if(_.without(gameOfLifeGrid.getCell(rowIterator, colIterator), 255).length !== 0)
            {
                currentCellAlive = true;
            }

            let numNear = numberCellNeighbors(gameOfLifeGrid, rowIterator, colIterator);

            if(currentCellAlive && (numNear < 2 || numNear > 3))
            {
                cellsToKill.push([rowIterator, colIterator]);
            }
            else if(!currentCellAlive && numNear === 3)
            {
                cellsToBringToLife.push([rowIterator, colIterator]);
            }
        }
    }

    cellsToKill.forEach( cell => {
        gameOfLifeGrid.setCell(cell[0], cell[1], dead);
    });

    cellsToBringToLife.forEach( cell => {
        gameOfLifeGrid.setCell(cell[0], cell[1], alive);
    });
}

function main(){
    var gameOfLifeGrid = new VirtualGrid('-KV6ko8ro6TrfSUzAaZ0');
    setTimeout(function() {
        EvaluateGrid(gameOfLifeGrid);
        setInterval(function() { EvaluateGrid(gameOfLifeGrid); } , 75);
    } , 5000);



}

module.exports = main;

/*
References:
-Lodash documentation
-https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
-W3 docs
*/
