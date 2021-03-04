/* This file initializes variables and constants used in the experiment

Author: Hannah Dames <damesh@cs.uni-freiburg.de>
Co-Authors:
    Florian Gouret
    Marie Jakob <mjakob@cs.uni-freiburg.de>

Supervision: Hannah Dames, Christina Pfeuffer

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, April 2020
 */

/* #####################################################################
      Define variables
 ##################################################################### */

// task specific variables
var stim_time = 1000; //presentation time of a stimulus
var Sequence = []; 
var seqResponse = [];
var index = 0;
var num_spaces = 3; //at what span should we start?
var curr_seq = [];
var n_error = 0;
var n_span = 0;
var goodBlock;

var time_so_far = 0; // time elapsed until CORSI started
const corsi_duration = 90000; // pre-defined duration of the task in ms
var continue_corsi = true; // set to false when corsi_duration has elapsed

var response = [];
var first_grid = '<div class = numbox>';


/* #####################################################################
      Define the CORSI grid
 ##################################################################### */

for (let i = 1; i < 26; i++) {
	first_grid += `<button id = button_${i} class = "square" onclick = "recordClick(this)"><div class = content></div></button>`;
}
first_grid += '</div>';

//this is the response grid; if a button is clicked uppon, it is highlighted in red
//only using the recordClick() function, we can store the response
//the grid design is adapted from: https://github.com/expfactory-experiments/spatial-span

var response_grid = '<div class = numbox>';
for (let i = 1; i < 26; i++) {
	response_grid += `<button id = ${i} class = "click_square" onclick = "recordClick(this)"><div class = content></div></button>`;
}
response_grid += '</div>';


// init ID
// uncomment to use corsi as a separate experiment
/*
const ID = jsPsych.randomization.randomID(15);
jsPsych.data.addProperties({
	subject: ID
});

*/
console.log("corsi/setup.js imported successfully.");