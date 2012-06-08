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

var board =  {

    internal: [ [{position: 0, status: "off"}, {position: 1, status : "off"}, {position: 2, status: "off"}],
		[{position: 3, status: "off"}, {position: 4, status : "on"},  {position: 5, status: "off"}],
		[{position: 6, status: "off"}, {position: 7, status : "off"}, {position: 8, status: "off"}]
	      ],
    
    cellIterate : function(f) {
	this.internal.forEach(function (row) {
	    row.forEach(function (cell) {
		f(cell);
	    });
	});
    },
    
    toggle : function (positions) {
	var x = function(cell) {
	    if (positions.indexOf(cell.position) > -1) {
		cell.status === "off" ? cell.status = "on" : cell.status = "off";
	    }
	};
	this.cellIterate(x);
    }, 
    
    
    fireOn : function fireOn(position) {
	switch (position) {
	case 0: 
	    return this.toggle([0,1,3]);
	case 1: 
	    return this.toggle([0,1,2,4]);
	case 2: 
	    return this.toggle([1,2,5]);
	case 3: 
	    return this.toggle([3,4,0,6]);
	case 4: 
	    return this.toggle([3,4,5,1,7]);
	case 5: 
	    return this.toggle([4,5,2,8]);
	case 6: 
	    return this.toggle([6,7,3]);
	case 7: 
	    return this.toggle([6,7,8,4]);
	case 8: 
	    return this.toggle([7,8,5]); 
	default: 
	    return console.log("switch default");
	}
    },
    


    print : function() {
	var b = this.internal.map(function(row) {
	    return row.map(function(cell) {
		return cell.status;
	    }).join(', ');
	}).join('\n');
	return b;
    },

    /**
     * Returns all cells of the board.
     * @param board
     */
    cells : function() {
	var cells = [];
	this.cellIterate(function(cell) {
	    cells.push(cell);
	});
	return cells;
    }
    
};
      

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
    var candidates = board.cells().filter(candidate);
    while (candidates.length > 0) {
	var index = getRandomInt(candidates.length - 1);
	var nextMoveCell = candidates[index];
//	console.log("Found #candidates " + c + " index " + index + ", trying position " + nextMove);
	moves.push(nextMoveCell.position);
	board.fireOn(nextMoveCell.position);
	candidates = board.cells().filter(candidate);
    }  
    console.log("Solution found");
    console.log("Moves " + moves);
    board.print();
    return moves;
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}


function _toggle(board, positions) {
    var x = function(cell) {
	if (positions.indexOf(cell.position) > -1) {
	    onOff(cell);
	}
    };

    cellIterate(board, x);
}



/**
 * Prints the board in a human readable format.
 * @param board the board
 */
function printBoard(board) {
    var b = board.map(function(row) {
	return row.map(function(cell) {
	    return cell.status;
	}).join(', ');
    }).join('\n');
    console.log(b);	 
}

function filterCell(cell, positions) {
    return (positions.indexOf(cell.position) > -1);
}


/**
 * A function which applied f to all
 * cells of the board.
 * @param board the board
 * @param f function to apply on all cells
 */
function _cellIterate(board, f) {
    board.forEach(function (row) {
	row.forEach(function (cell) {
	    f(cell);
	});
    });
}


function candidate(cell) {
    return (cell.status === "off");
}

