/*
 * Javascript solution to the nine wives riddle found in Sacred Odyssey.
 * 
 * There are 9 fire pits which needs all to be set on fire. Initially only
 * the middle one is set on fire. If you set fire on a pit all horizontally
 * and vertically ones will toggle their state.
 * 
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
    toggle(board, position - 3);
    if (position === 1 || position === 2
       || position === 4 || position === 5
       || position === 7 || position === 8) {
	toggle(board, position - 1);	
    }
    toggle(board, position);
    if (position === 0 || position === 1 
	|| position === 3 || position === 4 
	|| position === 6 || position === 7) {
	toggle(board, position + 1);
    }
    toggle(board, position + 3);
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
    switch (position) {
	case 0: 
	return {i:0, j:0};
	case 1: 
	return {i:0, j:1};
	case 2: 
	return {i:0, j:2};
	case 3: 
	return {i:1, j:0};
	case 4: 
	return {i:1, j:1};
	case 5: 
	return {i:1, j:2};
	case 6: 
	return {i:2, j:0};
	case 7: 
	return {i:2, j:1};
	case 8: 
	return {i:2, j:2};
	default:
	return undefined;
    }
}

function toggle(board, position) {
    var index = position2index(position);
    if (index) {
	onOff(board[index.i][index.j]);
    }
}

/**
 * Changes the state of the cell.
 * @param cell
 */
function onOff(cell) {
    if (cell.status === "off")
	cell.status = "on";
    else
	cell.status = "off"; 
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