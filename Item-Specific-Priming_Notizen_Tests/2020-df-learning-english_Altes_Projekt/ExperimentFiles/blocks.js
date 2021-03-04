/*
This file contains the block structure used in the experiment.
*/

/* #############################################################################
Welcome Pages
############################################################################# */
var welcome = {
    timeline: [
        welcome_1,
        welcome_2,
        welcome_3,
        welcome_4
        ],
    on_start: function() {
        exp_part_current = "welcome";
    }
};

var demographics = {
    timeline: [
        question_age,
        question_demographic_choice,
        conditional_education
        ],
    on_start: function() {
        $('body').css('cursor', 'default');
        exp_part_current = "demographics";
    },
    on_finish: function() {
        $('body').css('cursor', 'none')
    }
};

/* #############################################################################
Practise Blocks 
############################################################################# */

/* 1. Blocks used during Practice part */ 
var block_practice = {
    on_start: function() {
        exp_part_current = "practice_no_cue";
        $('body').css('cursor', 'none')
    },
    timeline_variables: stimuli_learning_practice,
    randomize_order: true,
    timeline: [
        response_prompt,
        practise_image_no_cue
    ]
};

var block_practice_cue = {
    on_start: function() {
        exp_part_current = "practice_cue";
    },
    timeline_variables: stimuli_learning_practice,
    randomize_order: true,
    timeline: [
        response_prompt,
        practise_image,
        feedback_timeline,
        forget_cue
    ]
};

const block_practice_recognition = {
    on_start: function() {
        exp_part_current = "practice_recog";
    },
    randomize_order: true,
    timeline: [
        image_recognition
    ],
    timeline_variables: stimuli_recognition_practice
};

/* #############################################################################
Test Blocks
############################################################################# */
/* 2. Prime blocks: A set of stimuli is presented 
and a specific (re)action (key pressed) is primed*/

const block_prime = {
    on_start: function() {
        exp_part_current = "prime";
    },
    timeline: [
        response_prompt,
        prime_image,
        feedback_timeline,
        forget_cue
    ],
    timeline_variables: stimuli_learning_phase,
    randomize_order: true
};

/* 3. Probe block: half of the stimuli already presented are repeted, 
for the other half the correct answer is switched */

const block_probe = {
    on_start: function() {
        exp_part_current = "probe";
    },
    timeline: [
        response_prompt,
        probe_image
    ],
    timeline_variables: stimuli_learning_phase,
    randomize_order: true
};


/* #############################################################################
End Pages
############################################################################# */
var ending = {
    on_start: function() {
        $('body').css('cursor', 'default')
    },
    timeline: [
        instruction_10,

        question_motivation,
        question_open,
        
        question_cue_choice,
        question_cue_open,

        debriefing,
        question_suspicion,
        question_suspicion_open,
        question_disturbed,
        question_serious_participation
        ]
};

console.log("Blocks imported successfully.") 
//show message if blocks are imported in html file

/*
Authors: 
Hannah Dames <damesh@cs.uni-freiburg.de>

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, July 2020
*/