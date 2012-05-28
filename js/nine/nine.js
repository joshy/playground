/*
 * Javascript solution to the nine wives riddle found in Sacred Odyssey.
 * 
 * There are 9 fire pits which needs all to be set on fire. Initially only
 * the middle one is set on fire. If you set fire on a pit all horizontally
 * and vertically ones will toggle their state (only adjacent).
 * 
 * One solution is [1,3,7,5,8,6,0,2]
 */

"use strict";

var board =  
    [ [{position: 0, status: "off"}, {position: 1, status : "off"}, {position: 2, status: "off"}],
      [{position: 3, status: "off"}, {position: 4, status : "on"},  {position: 5, status: "off"}],
      [{position: 6, status: "off"}, {position: 7, status : "off"}, {position: 8, status: "off"}]];
      

function verify(board, moves) {
    for (var i=0; i<moves.length; i++) {
	fireOn(board, moves[i]);
	printBoard(board);
    }    
}

/**
 * This simply runs the solve methods and just keeps
 * the solution with the lowest moves.
 * @param board intial board
 * @param how many runy to try
 */
function minimum(board, runs) {
    var m = solve(copy(board));
    
    console.log("Starting to run " + runs + " times");
    for (var i=0; i<runs; i++) {
	var b = copy(board);
	var mnew = solve(b);
	if (mnew.length < m.length) m = mnew;
    }
    console.log("Local minimum found " + m);
    
}

/**
 * Copy the board.
 * @param board
 * @return new board
 */
function copy(board) {
    return JSON.parse(JSON.stringify(board));
}

/**
 * Solves the riddle by trial. 
 * @param board
 * @return array of moves of the solution
 */
function solve(board) {
    var moves = [];
    while (candidates(board).length > 0) {
	var c = candidates(board);
	var index = getRandomInt(c.length - 1);
	var nextMove = c[index];
//	console.log("Found #candidates " + c + " index " + index + ", trying position " + nextMove);
	moves.push(nextMove);
	fireOn(board, nextMove);
    }
    console.log("Solution found");
    console.log("Moves " + moves);
    console.log("Candidates " + candidates(board));
    printBoard(board);
    return moves;
}

function fireOn(board, position) {
    switch (position) {
    case 0: 
	return toggle(board, [0,1,3]);
    case 1: 
	return toggle(board, [0,1,2,4]);
    case 2: 
	return toggle(board, [1,2,5]);
    case 3: 
	return toggle(board, [3,4,0,6]);
    case 4: 
	return toggle(board, [3,4,5,1,7]);
    case 5: 
	return toggle(board, [4,5,2,8]);
    case 6: 
	return toggle(board, [6,7,3]);
    case 7: 
	return toggle(board, [6,7,8,4]);
    case 8: 
	return toggle(board, [7,8,5]); 
    default: 
	return console.log("switch default");
    }
};


// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

/**
 * How many pits are not on fire.
 * @param board
 * @return array of positions where the fire is off
 */
function candidates(board) {
    var c = [];
    for (var i=0; i<3; i++) {
	for (var j=0; j<3; j++) {
	 if (board[i][j].status === "off") c.push(board[i][j].position);   
	}
    }
    return c;
}

function position2index(position) {
    var i = Math.floor(position / 3);
    var j = position % 3;
    return { i:i, j:j };
}

function toggle(board, positions) {
    for (var i=0; i<positions.length; i++) {
	var index = position2index(positions[i]);
	onOff(board[index.i][index.j]);
    }
}

/**
 * Changes the state of the cell.
 * @param cell
 */
function onOff(cell) {
    if (cell.status === "off") {
	cell.status = "on";
    } else {
	cell.status = "off";
    }
};

/**
 * Prints the board in a human readable format.
 * @param board
 */
function printBoard(board) {
    var b = "";
    for (var i=0; i<3; i++) {
	for (var j=0; j<3; j++)	{
	    b += board[i][j].status;
	    if (j < 2 )	b += ",";
	}
	b += '\n';
    }
    console.log(b);
}