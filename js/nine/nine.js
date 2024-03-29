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

function Board()  {

    this.solve = function() {
	var moves = [];
	var candidates = cells().filter(candidate);
	while (candidates.length > 0) {
	    var index = randomInt(candidates.length - 1);
	    var nextMoveCell = candidates[index];
	    //	console.log("Found #candidates " + c + " index " + index + ", trying position " + nextMove);
	    moves.push(nextMoveCell.position);
	    fireOn(nextMoveCell.position);
	    candidates = cells().filter(candidate);
	}  
	return moves;
    };

    var internal = [ 
	[{position: 0, status: "off"}, {position: 1, status : "off"}, {position: 2, status: "off"}],
	[{position: 3, status: "off"}, {position: 4, status : "on"},  {position: 5, status: "off"}],
	[{position: 6, status: "off"}, {position: 7, status : "off"}, {position: 8, status: "off"}]
    ];
        
    var cellIterate = function(f) {
	internal.forEach(function (row) {
	    row.forEach(function (cell) {
		f(cell);
	    });
	});
    };
    
    var toggle = function (positions) {
	var x = function(cell) {
	    if (positions.indexOf(cell.position) > -1) {
		cell.status === "off" ? cell.status = "on" : cell.status = "off";
	    }
	};
	cellIterate(x);
    };
    
    var fireOn = function fireOn(position) {
	switch (position) {
	case 0: 
	    return toggle([0,1,3]);
	case 1: 
	    return toggle([0,1,2,4]);
	case 2: 
	    return toggle([1,2,5]);
	case 3: 
	    return toggle([3,4,0,6]);
	case 4: 
	    return toggle([3,4,5,1,7]);
	case 5: 
	    return toggle([4,5,2,8]);
	case 6: 
	    return toggle([6,7,3]);
	case 7: 
	    return toggle([6,7,8,4]);
	case 8: 
	    return toggle([7,8,5]); 
	default: 
	    return undefined;
	}
    };

    var print = function() {
	var b = internal.map(function(row) {
	    return row.map(function(cell) {
		return cell.status;
	    }).join(', ');
	}).join('\n');
	return b;
    };

    /**
     * Returns all cells of the board.
     */
    var cells = function() {
	var cells = [];
	cellIterate(function(cell) {
	    cells.push(cell);
	});
	return cells;
    };

    // Returns a random integer between min and max
    // Using Math.round() will give you a non-uniform distribution!
    var randomInt = function(max) {
	return Math.floor(Math.random() * (max + 1));
    };

    var candidate = function(cell) {
	return (cell.status === "off");
    };
    
};

/**
 * This simply runs the solve methods and just keeps
 * the solution with the lowest moves.
 * @param how many runy to try
 */
function minimum(runs) {
    var m = new Board().solve();
    
    console.log("Starting to run " + runs + " times");
    for (var i=0; i<runs; i++) {
	var mnew = new Board().solve();
	if (mnew.length < m.length) m = mnew;
    }
    console.log("Local minimum found " + m);    
}
