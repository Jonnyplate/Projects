/*
This file contains the block structure used in the experiment.

Author: Hannah Dames <damesh@cs.uni-freiburg.de>
Co-Authors:
    Florian Gouret
    Marie Jakob <mjakob@cs.uni-freiburg.de>

Supervision: Hannah Dames, Christina Pfeuffer

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, April 2020
*/


// block presenting the sequence
var test_block = {
    on_start: function() {
        $('body').css('cursor', 'none')
    },
	randomize_order: false,
	timeline: [test_trial],
	loop_function: function(){
		// console.log("Index:", index);
		return index !== (num_spaces - 1);
	},
	on_finish: function() {
        $('body').css('cursor', 'default')
    },
};

	
// block for repeating the sequence
var response_block = {
    on_start: function() {
        $('body').css('cursor', 'default')
    },
	randomize_order: false,
	timeline: [response_trial],
	loop_function: function() {
		// console.log("Index:", index);
		return (index !== num_spaces - 1);
	},
	on_finish: function() {
        $('body').css('cursor', 'none')
    },
};

var corsi_spans = {
    timeline: [test_instr, test_block, response_instr, response_block, feedback_block, update],
	loop_function: function() {
    	return continue_corsi;
	},
	on_finish: function() {
        $('body').css('cursor', 'none')
    },
  };

console.log("corsi/blocks.js imported successfully.")
