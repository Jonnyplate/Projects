/*
This file contains all Javascript functions used in "index.html".

Some of these functions are adapted from:
https://github.com/expfactory-experiments/spatial-span

Author: Hannah Dames <damesh@cs.uni-freiburg.de>
Co-Authors:
    Florian Gouret
    Marie Jakob <mjakob@cs.uni-freiburg.de>

Supervision: Hannah Dames, Christina Pfeuffer

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, April 2020
*/


/**
 * Randomly draws an element from an Array
 * @param lst Array that is drawn from
 * @returns {*} a random element from the list
 */
var randomDraw = function(lst) {
	var index = Math.floor(Math.random() * (lst.length));
	return lst[index];
};

/**
 * python-like range() generator, yields numbers sequentially from minV to maxV
 * @param minV start (inclusive)
 * @param maxV end (inclusive)
 * yields elements fo
 */
function* range(minV, maxV) {
    var index = minV;
    while(index <= maxV) yield index++;
};

/* #####################################################################
      Define functions for sequence and grid generation
 ##################################################################### */


/**
 * Generates a random sequence of blinking blocks for a given sequence length
 * @param size {numeric} length of the block sequence
 * @returns {[]} the random sequence
 */
function getSequence(size){
    var sequence = [];
    var last_space = 0;
    var spaces = Array.from(range(1, 25));
    for (var i = 0; i < size; i++){
        var space = randomDraw(spaces.filter(function(x) {return x != last_space;}));
        last_space = space;
        sequence.push({"number": space});
    }
    return sequence;
};


/**
 * Generates a CORSI gridwith one red element at "position"
 * @param position {numeric} position of the red element
 * @returns {string} CORSI grid as a html string
 */
function generateGrid(position){
    var stim_grid = '<div class = numbox>';
    for (var j = 1; j < 26; j++) {
        if (j == position) {
            stim_grid += `<button id = button_${j} class = "square red" ><div class = content></div></button>`;
        } else {
            stim_grid += `<button id = button_${j} class = "square"><div class = content></div></button>`;
        }
    };
    stim_grid += '</div>';
    return stim_grid;
}


/**
 * Resets all CORSI variables that are updated during a run.
 * Used to present the corsi spans on multiple occasions during the experiment.
 */

function reset_corsi() {
    Sequence = [];
    seqResponse = [];
    index = 0;
    num_spaces = 3; //at what span should we start?
    curr_seq = [];
    n_error = 0;
    n_span = 0;
    goodBlock;

    time_so_far = 0; // time elapsed until CORSI started
    continue_corsi = true;
    // set to false when corsi_duration has elapsed
}

var response = [];

/* #####################################################################
      Define helper functions
 ##################################################################### */

/**
 * Generates an html string instructing participants to remember the sequence
 * @returns {string} html string
 */
var getTestText = function() {
    return '<div class = centerbox><div class = center-text><br><br>' + 
    "REMEMBER!<br><br><br><br>" +
    num_spaces + ' squares</p></div>';
};

/**
 * records the box the participant clicks on
 * @param elm
 */
var recordClick = function(elm) {
    // console.log("Button pressed:",$(elm).attr('id'));
	response = $(elm).attr('id');
};




// uncomment to use as a separate experiment
/**
 * Enables download of the experimental data in piloting mode
 * from: https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
 */
/*
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
};
*/

console.log("corsi/trials.js imported successfully.")
