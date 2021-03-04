/*
This file contains the trial structure used in the experiment.

Author: Hannah Dames <damesh@cs.uni-freiburg.de>
Co-Authors:
    Florian Gouret
    Marie Jakob <mjakob@cs.uni-freiburg.de>

Supervision: Hannah Dames, Christina Pfeuffer

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, April 2020
*/


// trial for presenting the corsi sequence
var test_trial = {
	type: 'html-keyboard-response',
	stimulus: "",
    on_start: function(test_trial){
		index += 1;
		// console.log("Test trial sequence", Sequence[index]);
        test_trial.stimulus = generateGrid(Sequence[index].number);

    },
	trial_duration: stim_time,
	stimulus_duration: stim_time,
	choices: 'jsPsych.NO_KEYS',
	data: {
		test_part: "viewing",
		exp_part: "corsi"
	},
	// check if the given time has elapsed:
	on_finish: function(data) {
		data.n_span = n_span;
		corsi_time = data.time_elapsed - time_so_far;
		// console.log("Corsi time: ", corsi_time);
		if (corsi_time >= corsi_duration) {
			continue_corsi = false;
			jsPsych.endCurrentTimeline();
		}
	}

};

// trial for repeating the corsi sequence by the user
var response_trial = {
		type: 'html-button-response',
		stimulus: ' ',
		on_start: function(response_trial){
			index += 1;
			response_trial.button_html = response_grid;
		},
		response_ends_trial: true,
		trial_duration: null,
		choices: 'jsPsych.NO_KEYS',
		key_answer: jsPsych.timelineVariable("correct_resp"),
		data: {
			test_part: "response",
			exp_part: "corsi"
		},
		on_finish: function(data) {
			// console.log(Sequence[index]);

			data.n_span = n_span;
			data.response = response;
			data.correct_resp = Sequence[index].number;
			data.sequence = curr_seq;
			data.num_spaces = num_spaces;
			data.correct = data.response == data.correct_resp;
			// console.log(data.response == data.correct_resp);
			seqResponse.push({positionInSeq:index, correct: data.correct});
            response = 0;
			// check if the given time has elapsed:
            corsi_time = data.time_elapsed - time_so_far;
			// console.log("Corsi time: ", corsi_time);
            if (corsi_time >= corsi_duration) {
				continue_corsi = false;
				jsPsych.endCurrentTimeline();
			}
		},
};

// presenting the sequence length to the person
var test_instr = {
	type: 'html-keyboard-response',
	stimulus: getTestText,
	data: {
		test_part: "test_intro",
		exp_part: "corsi"
	},
	choices: 'jsPsych.NO_KEYS',
	stimulus_duration: stim_time,
	trial_duration: stim_time,
	response_ends_trial: false,
    on_start: function(test_block){
        // console.log("Start of the trial");
		Sequence = getSequence(num_spaces);
		index = -1;
		goodBlock = false;
        console.log("Sequence",Sequence);
		test_block.timeline_variables = Sequence;
		seqResponse = [];
    },
	data: {
		test_part: "instr_remember",
		exp_part: "corsi"
	},
	// check if the given time has elapsed:
	on_finish: function(data) {
		n_span ++;
		data.n_span = n_span;
		corsi_time = data.time_elapsed - time_so_far;
		// console.log("Corsi time: ", corsi_time);
		if (corsi_time >= corsi_duration) {
			continue_corsi = false;
			jsPsych.endCurrentTimeline();
		}
	}
};

// instruction to repeat
var response_instr = {
	type: 'html-keyboard-response',
	stimulus: function() {
		if (continue_corsi) {
			return '<div class = centerbox><div class = center-text><br><br>' +
				"Repeat!</p></div>";
		} else {
			return "";
		}
	},
	data: {
		test_part: "response_instr",
		exp_part: "corsi"
	},
	choices: 'jsPsych.NO_KEYS',
	stimulus_duration: function() {
		return continue_corsi ? stim_time: 1;
	},
	trial_duration: function() {
		return continue_corsi ? stim_time: 1;
	},
	response_ends_trial: false,
    on_start: function(){
		index = -1;
	},
	// check if the given time has elapsed:
	on_finish: function(data) {
		corsi_time = data.time_elapsed - time_so_far;
		data.n_span = n_span;
		// console.log("Corsi time: ", corsi_time);
		if (corsi_time >= corsi_duration) {
			continue_corsi = false;
			jsPsych.endCurrentTimeline();
		}
	}
};

// presenting the feedback
var feedback_block = {
	type: "html-keyboard-response",
	data: {
		test_part: "feedback",
		exp_part: "corsi"
	},
	choices: 'jsPsych.NO_KEYS',
	// if the given duration has passed, show a blank slide for one ms instead
	// of the usual feedback:
	stimulus_duration: function() {
		return continue_corsi ? 1000 : 1;
	},
	trial_duration: function() {
		return continue_corsi ? 1000 : 1;
	},
	stimulus: function() {
		if (! continue_corsi) {
			return "";
		} else {
			// console.log("Response Sequence: ", seqResponse);
			var n_error = seqResponse.filter(elt => elt.correct === false).length;
			// console.log("n_error: ", n_error);
			var feedback = n_error == 0 ? "Correct!" : "Error!";
			goodBlock = n_error == 0 ? true : false;
			return '<div class = centerbox><div class = center-text>' + feedback + '</div></div>';
		}
	},
	// check if the given time has elapsed:
	on_finish: function(data) {
		data.n_span = n_span;
		corsi_time = data.time_elapsed - time_so_far;
		// console.log("Corsi time: ", corsi_time);
		if (corsi_time >= corsi_duration) {
			continue_corsi = false;
			jsPsych.endCurrentTimeline();
		}
	}
};

// updating the span length depending on output
var update = {
	type: 'html-keyboard-response',
	stimulus: "",
    on_start: function(){
		console.log("update");
		if (goodBlock){
			console.log("good block :)");
			num_spaces += 1;
		} else {
			console.log(":(");
            num_spaces += 0;
        }
    },
	data: {
		test_part: "update",
		exp_part: "corsi"
	},
	trial_duration: 1,
	choices: 'jsPsych.NO_KEYS',
	on_finish: function(data) {
		data.n_span = n_span;
	}
};

// random ending page (only used in the separate corsi version)
var ende = {
    type: 'html-keyboard-response',
    stimulus: "Ende!",
    data: {
      trial_id: "Ende"
    },
    choices: 'jsPsych.NO_KEYS',
    stimulus_duration: stim_time,
    trial_duration: stim_time,
    response_ends_trial: false,
    on_finish: function() {
      // console.log("reached end.")
    }
  };

console.log("corsi/trials.js imported successfully.")