/*
This file contains the trials used in the experiment.
*/

/* #############################################################################
General trials
############################################################################# */

/* Memory cue presented to participants in order to categorize stimuli 
in remember or forget condition*/
var forget_cue = {
    type: 'html-keyboard-response',
    stimulus: function() {
        let forget = jsPsych.timelineVariable("forget_condition", true); 
        if (forget === "forget") {
            return FCUE
        } else {
            return RCUE
        }
    },
    choices: jsPsych.NO_KEYS,          
    trial_duration: DURATIONS.CUE,                //timing defined in basics.js
    data: {trial_part: 'forget_cue'
        }
};

//Separate Feedback 
var feedback = {
    type: 'html-keyboard-response',
    stimulus: function(){
        let last_key_press = jsPsych.data.get().last(1).values()[0];
        if(last_key_press["key_press"] == null){return FSLOW}
        else { return FINCORRECT}
    },
    choices: jsPsych.NO_KEYS,
    trial_duration:  DURATIONS.FEEDBACK,
    data: {trial_part: 'feedback'}
  }

var feedback_timeline = {
    timeline: [feedback],
    conditional_function: function() {
        let last_key_press = jsPsych.data.get().last(1).values()[0];
        return ((last_key_press["key_press"] == null)||(last_key_press["correct"] == false));
    },
}
/* #############################################################################
Classification trials
############################################################################# */
var response_prompt = {
    type: 'html-keyboard-response',
    // jsPsych.timelineVariable is evaluated be evaluated before the value is displayed 
    //refering to https://www.jspsych.org/overview/timeline/
    stimulus: function() {
        let mapping = jsPsych.timelineVariable("resp_map", true);
        return '<span style="color: black; font-size: 48px">' + mapping + '</span>'
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.FIX,
    data: {trial_part: 'resp_prompt'}
};

//practise trials no cue
var practise_image_no_cue = {
    type: 'categorize-image',
    stimulus: function() {
        // get the index from the image in the preloaded list
        let idx = jsPsych.timelineVariable("image_index", true);
        // make sure its the same as in the stimulus object:
        let path = jsPsych.timelineVariable("path", true);
        if (all_images[idx] !== path) {
            console.log("Different image presented!")
        }
        return all_images[idx];
    },
    choices: [KEYS.LEFT, KEYS.RIGHT, "space"],
    key_answer: jsPsych.timelineVariable("correct_resp"),
    correct_text: FCORRECT,
    incorrect_text: FINCORRECT,
    show_stim_with_feedback: false,
    timeout_message: FSLOW,
    stimulus_duration:  DURATIONS.IMAGE,    //timing defined in basics.js
    feedback_duration:  DURATIONS.FEEDBACK, //timing defined in basics.js
    trial_duration:  DURATIONS.IMAGE,       //timing defined in basics.js
    on_finish: function(data) {
     trial_num += 1;
     data.trial_num = trial_num;
     data.block_num = block_num;
     data.block = block;
     data.correct = data.key_press == data.correct_resp;
     if (data.key_press === KEYS_JS.LEFT) {
         data.response = "left";
     } else if (data.key_press === KEYS_JS.RIGHT) {
         data.response = "right";
     } else {
         data.response = "too_slow";
    };
    },
    data: {
        trial_part: 'test',
        resp_map: jsPsych.timelineVariable("resp_map"),
        correct_resp: jsPsych.timelineVariable("correct_resp"),
        probe_condition: jsPsych.timelineVariable("probe_condition"),
        category: jsPsych.timelineVariable("cat"),
        image: jsPsych.timelineVariable("image"),
        forget_condition: jsPsych.timelineVariable("forget_condition"),
        list: jsPsych.timelineVariable("list")
    }
};

//practise trials with cue
var practise_image = {
    type: 'categorize-image',
    stimulus: function() {
        // get the index from the image in the preloaded list
        let idx = jsPsych.timelineVariable("image_index", true);
        // make sure its the same as in the stimulus object:
        let path = jsPsych.timelineVariable("path", true);
        if (all_images[idx] !== path) {
            console.log("Different image presented!")
        }
        return all_images[idx];
    },
    choices: [KEYS.LEFT, KEYS.RIGHT, "space"],
    key_answer: jsPsych.timelineVariable("correct_resp"),
    correct_text: '<span></span>',
    incorrect_text: '<span></span>',
    timeout_message: '<span></span>',
    stimulus_duration:  DURATIONS.IMAGE,
    feedback_duration: 0.00000000000000000001,
    stimulus_duration:  DURATIONS.IMAGE,    //timing defined in basics.js
    trial_duration:  DURATIONS.IMAGE,       //timing defined in basics.js
    on_finish: function(data) {
    trial_num += 1;
    data.trial_num = trial_num;
    data.block_num = block_num;
    data.block = block;
    data.correct = data.key_press == data.correct_resp;
    if (data.key_press === KEYS_JS.LEFT) {
        data.response = "left";
    } else if (data.key_press === KEYS_JS.RIGHT) {
        data.response = "right";
    } else {
        data.response = "too_slow";
    };
    },
    data: {
        trial_part: 'test',
        resp_map: jsPsych.timelineVariable("resp_map"),
        correct_resp: jsPsych.timelineVariable("correct_resp"),
        probe_condition: jsPsych.timelineVariable("probe_condition"),
        category: jsPsych.timelineVariable("cat"),
        image: jsPsych.timelineVariable("image"),
        forget_condition: jsPsych.timelineVariable("forget_condition"),
        list: jsPsych.timelineVariable("list"),
        block_num: block_num,
        block: block
    }
};

//prime image
// Image no Feedback 

var prime_image = {
    type: 'categorize-image',
    stimulus: function() {
        // get the index from the image in the preloaded list
        let idx = jsPsych.timelineVariable("image_index", true);
        // make sure its the same as in the stimulus object:
        let path = jsPsych.timelineVariable("path", true);
        if (all_images[idx] !== path) {
            console.log("Different image presented!")
        }
        return all_images[idx];
        console.log(block);
    },
    choices: [KEYS.LEFT, KEYS.RIGHT, "space"],
    key_answer: jsPsych.timelineVariable("correct_resp"),
    correct_text: '<span></span>',
    incorrect_text: '<span></span>',
    timeout_message: '<span></span>',
    stimulus_duration:  DURATIONS.IMAGE,
    feedback_duration: 0.00000000000000000001,
    stimulus_duration:  DURATIONS.IMAGE,    //timing defined in setup.js
    trial_duration:  DURATIONS.IMAGE,       //timing defined in setup.js
    on_finish: function(data) {
    trial_num += 1;
    data.trial_num = trial_num;
    data.block_num = block_num;
    data.block = block;
    data.correct = data.key_press == data.correct_resp;
    if (data.key_press === KEYS_JS.LEFT) {
        data.response = "left";
    } else if (data.key_press === KEYS_JS.RIGHT) {
        data.response = "right";
    } else {
        data.response = "too_slow";
    };
    },
    data: {
        trial_part: 'test',
        resp_map: jsPsych.timelineVariable("resp_map"),
        correct_resp: jsPsych.timelineVariable("correct_resp"),
        probe_condition: jsPsych.timelineVariable("probe_condition"),
        category: jsPsych.timelineVariable("cat"),
        image: jsPsych.timelineVariable("image"),
        forget_condition: jsPsych.timelineVariable("forget_condition"),
        list: jsPsych.timelineVariable("list")
    }
};


var probe_image = {
    type: 'categorize-image',
    stimulus: function() {
        // get the index from the image in the preloaded list
        let idx = jsPsych.timelineVariable("image_index", true);
        // make sure its the same as in the stimulus object:
        let path = jsPsych.timelineVariable("path", true);
        if (all_images[idx] !== path) {
            console.log("Different image presented!")
        }
        return all_images[idx];
        console.log(block);
    },
    choices: [KEYS.LEFT, KEYS.RIGHT, "space"],
    key_answer: jsPsych.timelineVariable("correct_resp"),
    correct_text: '<span>  </span>',
    incorrect_text: FINCORRECT,
    show_stim_with_feedback: false,
    timeout_message: FSLOW,
    stimulus_duration:  DURATIONS.IMAGE,    //timing defined in basics.js
    feedback_duration:  DURATIONS.FEEDBACK, //timing defined in basics.js
    trial_duration:  DURATIONS.IMAGE,       //timing defined in basics.js
    on_finish: function(data) {
    trial_num += 1;
    data.trial_num = trial_num;
    data.block_num = block_num;
    data.block = block;
    data.correct = data.key_press == data.correct_resp;
    if (data.key_press === KEYS_JS.LEFT) {
        data.response = "left";
    } else if (data.key_press === KEYS_JS.RIGHT) {
        data.response = "right";
    } else {
        data.response = "too_slow";
    };
    },
    data: {
        trial_part: 'test',
        resp_map: jsPsych.timelineVariable("resp_map"),
        correct_resp: jsPsych.timelineVariable("correct_resp"),
        probe_condition: jsPsych.timelineVariable("probe_condition"),
        category: jsPsych.timelineVariable("cat"),
        image: jsPsych.timelineVariable("image"),
        forget_condition: jsPsych.timelineVariable("forget_condition"),
        list: jsPsych.timelineVariable("list")
    }
};
/* #############################################################################
Recognition trials
############################################################################# */


var image_recognition = {
    type: 'categorize-image',
    stimulus: function() {
        // get the index from the image in the preloaded list
        let idx = jsPsych.timelineVariable("image_index", true);
        // make sure its the same as in the stimulus object:
        let path = jsPsych.timelineVariable("path", true);
        // display warning message in the console
        if (all_images[idx] !== path) {
            console.log("Different image presented!");
            console.log("From stimuli_learning_phase: ", path);
            console.log("From all_images Array: ", all_images[idx]);
        }
        return all_images[idx];
    },
    choices: [KEYS.LEFT, KEYS.RIGHT],
    key_answer: jsPsych.timelineVariable("correct_resp_rec"),
    correct_text: FCORRECT,
    incorrect_text: FINCORRECT,
    show_stim_with_feedback: false,
    //timeout_message: '<p style="color: black; font-size: 48px;"> Zu langsam! </p>',
    //stimulus_duration: 2000,
    feedback_duration:  DURATIONS.FEEDBACK,
    //trial_duration: 2000,
    on_finish: function(data) {
        trial_num += 1;
        data.trial_num = trial_num;
        data.block_num = block_num;
        data.block = block;
        if (data.key_press === KEYS_JS.LEFT) {
            data.response = "left";
        } else if (data.key_press === KEYS_JS.RIGHT) {
            data.response = "right";
        } else {
            data.response = "too_slow";
        };
        // data.correct = data.key_press == data.correct_resp_rec;
    },
    data: {
        trial_part: 'test',
        category: jsPsych.timelineVariable("cat"),
        image: jsPsych.timelineVariable("image"),
        list: jsPsych.timelineVariable("list"),
        correct_resp: jsPsych.timelineVariable("correct_resp_rec")
    },
    prompt: function() {
        // display the response labels
        let left_label = jsPsych.timelineVariable("left_key", true);
        let right_label = jsPsych.timelineVariable("right_key", true);
        return "<p style='position: absolute; " +
        "margin-left: auto; margin-right: auto; top: 70%; right: 30%; " +
        "font-size: 28px; line-height: 1.5'>" +
        right_label +  
        "<p style='position: absolute; " +
        "margin-left: auto; margin-right: auto; top: 70%; left: 30%; " +
        "font-size: 28px; line-height: 1.5'>" +
        left_label 
    }
};


console.log("Trials imported successfully.") //show message if blocks are imported in html file

/*
Authors: 
Hannah Dames <damesh@cs.uni-freiburg.de>, 
Sara Feickert

Contributors: Marie Jakob 
Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, July 2020

*/