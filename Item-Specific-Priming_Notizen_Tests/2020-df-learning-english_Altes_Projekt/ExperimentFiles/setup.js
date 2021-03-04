/*
This file 
- declares and initialized constants, basic variables 
- prepares the datastructure containing the images presented in the experiment
- participant set-up
 */

/* #############################################################################
        Define Variables and Constants
############################################################################# */
var testMode = false //true / false

/* Constants for response keys and timing 
Key codes information can be taken from https://keycode.info/ */

const KEYS = {
    CONTINUE: "space", 
    BACK: "z", 
    LEFT: "s", 
    RIGHT: "l"};

const KEYS_JS = {
    CONTINUE: 32, 
    BACK: 90, 
    LEFT: 83, 
    RIGHT: 76};

// stimulus durations in ms
const DURATIONS = {
    FIX: 700, 
    RESP_MAP: 700, 
    IMAGE: 2000, 
    CUE: 2000, 
    FEEDBACK: 500, 
}

var timeline = [];
var exp_part_current;
var urlvar = jsPsych.data.urlVariables();
var exp_part;
var trial_num = 0;
var block_num = 1;
var block = 'start';
var prime = 1;
var probe_num = 1;
var trial_num_per_block = 0;
var n_too_slow_prev = 0;
var n_errors_prev = 0;
var n_too_slow, n_errors;

//feedback
const FSLOW = '<span style="color: red; font-size: 48px">Too slow!</span>'; //"Too slow"-feedbacks
const FINCORRECT = '<span style="color: red; font-size: 48px">Error!</span>'; //"incorrect"-feedbacks
const FCORRECT = '<span style="color: darkgreen; font-size: 48px;"> Correct! </span>'; //"correct"-feedbacks

//Cues
const FCUE = '<div style="align-items: center; display: flex; ' +
'color: darkorange; font-size: 90px"><b>ø</b></div>';
const RCUE = '<div style="align-items: center; display: flex; ' +
'color: dodgerblue; font-size: 90px"><b>o</b></div>';

// initialize variables to record browser interactions
var pause = false; // is the experiment paused?
var n_blur = 0;

//consent given?
var consent = false;
var education_text = false;
var experiment_aborted = false; 


 /* #############################################################################
    Create image array
############################################################################# */ 

var LM = JSON.parse(
    '[{"Picture":"LM51.bmp","PictureNR":17,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM51.bmp"},{"Picture":"LM209.bmp","PictureNR":102,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM209.bmp"},{"Picture":"LM57.bmp","PictureNR":22,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM57.bmp"},{"Picture":"LM179.bmp","PictureNR":88,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM179.bmp"},{"Picture":"LM58.bmp","PictureNR":23,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM58.bmp"},{"Picture":"LM129.bmp","PictureNR":63,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM129.bmp"},{"Picture":"LM100.bmp","PictureNR":44,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM100.bmp"},{"Picture":"LM103.bmp","PictureNR":46,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM103.bmp"},{"Picture":"LM59.bmp","PictureNR":24,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM59.bmp"},{"Picture":"LM167.bmp","PictureNR":82,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM167.bmp"},{"Picture":"LM216.bmp","PictureNR":109,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM216.bmp"},{"Picture":"LM157.bmp","PictureNR":78,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM157.bmp"},{"Picture":"LM75.bmp","PictureNR":33,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM75.bmp"},{"Picture":"LM235.bmp","PictureNR":125,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM235.bmp"},{"Picture":"LM150.bmp","PictureNR":73,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM150.bmp"},{"Picture":"LM48.bmp","PictureNR":14,"StimulusType":"LM","path":".\/Stimuli\/SelectedImages\/LM\/LM48.bmp"}]'
);

var SN = JSON.parse(
    '[{"Picture":"SN187.bmp","PictureNR":486,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN187.bmp"},{"Picture":"SN111.bmp","PictureNR":447,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN111.bmp"},{"Picture":"SN179.bmp","PictureNR":481,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN179.bmp"},{"Picture":"SN27.bmp","PictureNR":399,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN27.bmp"},{"Picture":"SN155.bmp","PictureNR":467,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN155.bmp"},{"Picture":"SN140.bmp","PictureNR":462,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN140.bmp"},{"Picture":"SN182.bmp","PictureNR":484,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN182.bmp"},{"Picture":"SN60.bmp","PictureNR":416,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN60.bmp"},{"Picture":"SN181.bmp","PictureNR":483,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN181.bmp"},{"Picture":"SN128.bmp","PictureNR":455,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN128.bmp"},{"Picture":"SN64.bmp","PictureNR":419,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN64.bmp"},{"Picture":"SN18.bmp","PictureNR":392,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN18.bmp"},{"Picture":"SN240.bmp","PictureNR":512,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN240.bmp"},{"Picture":"SN49.bmp","PictureNR":410,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN49.bmp"},{"Picture":"SN93.bmp","PictureNR":440,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN93.bmp"},{"Picture":"SN52.bmp","PictureNR":412,"StimulusType":"SN","path":".\/Stimuli\/SelectedImages\/SN\/SN52.bmp"}]'
);

var LN = JSON.parse(
    '[{"Picture":"LN42.bmp","PictureNR":156,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN42.bmp"},{"Picture":"LN166.bmp","PictureNR":222,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN166.bmp"},{"Picture":"LN92.bmp","PictureNR":182,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN92.bmp"},{"Picture":"LN150.bmp","PictureNR":214,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN150.bmp"},{"Picture":"LN28.bmp","PictureNR":145,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN28.bmp"},{"Picture":"LN59.bmp","PictureNR":166,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN59.bmp"},{"Picture":"LN13.bmp","PictureNR":137,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN13.bmp"},{"Picture":"LN9.bmp","PictureNR":134,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN9.bmp"},{"Picture":"LN177.bmp","PictureNR":227,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN177.bmp"},{"Picture":"LN82.bmp","PictureNR":176,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN82.bmp"},{"Picture":"LN101.bmp","PictureNR":187,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN101.bmp"},{"Picture":"LN149.bmp","PictureNR":213,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN149.bmp"},{"Picture":"LN111.bmp","PictureNR":192,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN111.bmp"},{"Picture":"LN12.bmp","PictureNR":136,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN12.bmp"},{"Picture":"LN128.bmp","PictureNR":198,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN128.bmp"},{"Picture":"LN131.bmp","PictureNR":200,"StimulusType":"LN","path":".\/Stimuli\/SelectedImages\/LN\/LN131.bmp"}]'
);

var SM = JSON.parse(
    '[{"Picture":"SM200.bmp","PictureNR":355,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM200.bmp"},{"Picture":"SM207.bmp","PictureNR":360,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM207.bmp"},{"Picture":"SM17.bmp","PictureNR":264,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM17.bmp"},{"Picture":"SM108.bmp","PictureNR":315,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM108.bmp"},{"Picture":"SM24.bmp","PictureNR":270,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM24.bmp"},{"Picture":"SM128.bmp","PictureNR":330,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM128.bmp"},{"Picture":"SM184.bmp","PictureNR":351,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM184.bmp"},{"Picture":"SM195.bmp","PictureNR":353,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM195.bmp"},{"Picture":"SM148.bmp","PictureNR":340,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM148.bmp"},{"Picture":"SM213.bmp","PictureNR":363,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM213.bmp"},{"Picture":"SM78.bmp","PictureNR":300,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM78.bmp"},{"Picture":"SM73.bmp","PictureNR":296,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM73.bmp"},{"Picture":"SM74.bmp","PictureNR":297,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM74.bmp"},{"Picture":"SM205.bmp","PictureNR":358,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM205.bmp"},{"Picture":"SM76.bmp","PictureNR":298,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM76.bmp"},{"Picture":"SM106.bmp","PictureNR":313,"StimulusType":"SM","path":".\/Stimuli\/SelectedImages\/SM\/SM106.bmp"}]'
);

var prac = JSON.parse(
    '[{"Picture":"LM143.jpg","PictureNR":0,"StimulusType":"LM","path":".\/Stimuli\/ImagesPractice\/LM143.jpg"},{"Picture":"LM147.jpg","PictureNR":0,"StimulusType":"LM","path":".\/Stimuli\/ImagesPractice\/LM147.jpg"},{"Picture":"LM224.jpg","PictureNR":0,"StimulusType":"LM","path":".\/Stimuli\/ImagesPractice\/LM224.jpg"},{"Picture":"LM230.jpg","PictureNR":0,"StimulusType":"LM","path":".\/Stimuli\/ImagesPractice\/LM230.jpg"},{"Picture":"LM239.jpg","PictureNR":0,"StimulusType":"LM","path":".\/Stimuli\/ImagesPractice\/LM239.jpg"},{"Picture":"LM55.jpg","PictureNR":0,"StimulusType":"LM","path":".\/Stimuli\/ImagesPractice\/LM55.jpg"},{"Picture":"LN109.jpg","PictureNR":0,"StimulusType":"LN","path":".\/Stimuli\/ImagesPractice\/LN109.jpg"},{"Picture":"LN15.jpg","PictureNR":0,"StimulusType":"LN","path":".\/Stimuli\/ImagesPractice\/LN15.jpg"},{"Picture":"LN17.jpg","PictureNR":0,"StimulusType":"LN","path":".\/Stimuli\/ImagesPractice\/LN17.jpg"},{"Picture":"LN2.jpg","PictureNR":0,"StimulusType":"LN","path":".\/Stimuli\/ImagesPractice\/LN2.jpg"},{"Picture":"LN4.jpg","PictureNR":0,"StimulusType":"LN","path":".\/Stimuli\/ImagesPractice\/LN4.jpg"},{"Picture":"LN72.jpg","PictureNR":0,"StimulusType":"LN","path":".\/Stimuli\/ImagesPractice\/LN72.jpg"},{"Picture":"SM35.jpg","PictureNR":0,"StimulusType":"SM","path":".\/Stimuli\/ImagesPractice\/SM35.jpg"},{"Picture":"SM37.jpg","PictureNR":0,"StimulusType":"SM","path":".\/Stimuli\/ImagesPractice\/SM37.jpg"},{"Picture":"SM61.jpg","PictureNR":0,"StimulusType":"SM","path":".\/Stimuli\/ImagesPractice\/SM61.jpg"},{"Picture":"SM62.jpg","PictureNR":0,"StimulusType":"SM","path":".\/Stimuli\/ImagesPractice\/SM62.jpg"},{"Picture":"SM97.jpg","PictureNR":0,"StimulusType":"SM","path":".\/Stimuli\/ImagesPractice\/SM97.jpg"},{"Picture":"SM98.jpg","PictureNR":0,"StimulusType":"SM","path":".\/Stimuli\/ImagesPractice\/SM98.jpg"},{"Picture":"SN205.jpg","PictureNR":0,"StimulusType":"SN","path":".\/Stimuli\/ImagesPractice\/SN205.jpg"},{"Picture":"SN220.jpg","PictureNR":0,"StimulusType":"SN","path":".\/Stimuli\/ImagesPractice\/SN220.jpg"},{"Picture":"SN221.jpg","PictureNR":0,"StimulusType":"SN","path":".\/Stimuli\/ImagesPractice\/SN221.jpg"},{"Picture":"SN222.jpg","PictureNR":0,"StimulusType":"SN","path":".\/Stimuli\/ImagesPractice\/SN222.jpg"},{"Picture":"SN75.jpg","PictureNR":0,"StimulusType":"SN","path":".\/Stimuli\/ImagesPractice\/SN75.jpg"},{"Picture":"SN76.jpg","PictureNR":0,"StimulusType":"SN","path":".\/Stimuli\/ImagesPractice\/SN76.jpg"}]'
);

// add and rename some properties
for (let Arr of [prac, LM, LN, SN, SM]) {
    for (let i of Arr) {
        i["type"] = "test";
        if (Arr == prac) {
            i["type"] = "practice";
        }
        i = rename(i, "Picture", "image");
        i = rename(i, "StimulusType", "cat");
        i = rename(i, "PictureNR", "image_nr");
    }
}

// create image array
const all_images = create_image_array([prac, LM, LN, SN, SM]);

/* ##########################################################################
       participant set-up
########################################################################## */

//Create ID by combining 15 random numbers 
const ID = jsPsych.randomization.randomID(15);
jsPsych.data.addProperties({subject: ID});
   
stim = randomize_stimuli();
stimuli_learning_phase = stim[0];

practice_stimuli = prepare_practice_trials();
stimuli_recognition_practice = practice_stimuli[0];
stimuli_learning_practice = practice_stimuli[1];

vp_setup(ID);
/*
stimuli_recognition_1 = stimuli_recognition_phase.slice(0,
    stimuli_recognition_phase.length/2);
stimuli_recognition_2 = stimuli_recognition_phase.slice(
    stimuli_recognition_phase.length/2);
    */

console.log("setup imported successfully.")


//for testing purposes:
if (testMode) {
        DURATIONS.FIX = 5, 
        DURATIONS.RESP_MAP = 5, 
        DURATIONS.IMAGE = 5, 
        DURATIONS.CUE = 5, 
        DURATIONS.FEEDBACK = 5
    }

/*
Authors: 
Hannah Dames <damesh@cs.uni-freiburg.de>, 
Sara Feickert

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, July 2020

*/
