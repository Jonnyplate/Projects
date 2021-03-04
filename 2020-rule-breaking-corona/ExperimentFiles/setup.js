/* #####################################################################
        This file declares and initializes constants and
        basic variables and participant set-up
##################################################################### */

/* #################### images and stimuli used in the experiment #################### */
var Blockade_C ='img/Face_Mask.png'
var Blockade_N = "img/Zutritt_verboten.png"
var Symbol_1 ="img/King_2.png"
var Symbol_2 = "img/Pawn.png"
var Police = "img/Police_2.png"
var Star = "img/Star.png"
var Circle = "img/Circle.png"
var AHA_pic = "img/AHA.png"

var images = [
      Blockade_C, Blockade_N, 
      Symbol_1, Symbol_2,
      Police, 
      Star, 
      Circle,
      AHA_pic
];

/* #################### paradigm specific setup #################### */
var trespasses = 0
var TT_cum = 0
var correct_uncritical_trials = 0
var points_cum = 0

const MINBONUSTIME = 1000 
var tot_blocks = 12 // number of blocks in the main experiment

var test_stimuli = [
// Time Bonus + 1
  // Block pos right
    // Target Symbol 1
      // Target pos right
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Target_pos: 'right', BlposX: 'right', data: {Target_Symbol: "king", RuleType: "Corona"}},
{time_Bonus: 1,blockade: {file: Blockade_N,} ,Symbol: [Symbol_1, Symbol_2] ,Target_pos: 'right', BlposX: 'right', data: {Target_Symbol: "king",RuleType: "Everyday"}},
      // Target pos left
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Target_pos: 'left', BlposX: 'right', data: {Target_Symbol: "king",RuleType: "Corona"}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Target_pos: 'left', BlposX: 'right', data: {Target_Symbol: "king",RuleType: "Everyday"}},
    // Target Symbol 2
      //Target pos right 
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Target_pos: 'right', BlposX: 'right', data: {Target_Symbol: "pawn",RuleType: "Corona"}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Target_pos: 'right', BlposX: 'right', data: {Target_Symbol: "pawn",RuleType: "Everyday"}},
      // Target pos left
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Target_pos: 'left', BlposX: 'right', data: {Target_Symbol: "pawn",RuleType: "Corona"}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Target_pos: 'left', BlposX: 'right', data: {Target_Symbol: "pawn",RuleType: "Everyday"}},
  // Block pos left
    // Target Symbol 1
      // Target pos right
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Target_pos: 'right', BlposX: 'left', data: {Target_Symbol: "king",RuleType: "Corona"}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Target_pos: 'right', BlposX: 'left', data: {Target_Symbol: "king",RuleType: "Everyday"}},
      // Target pos left
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Target_pos: 'left', BlposX: 'left', data: {Target_Symbol: "king",RuleType: "Corona"}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Target_pos: 'left', BlposX: 'left', data: {Target_Symbol: "king",RuleType: "Everyday"}},
    // Target Symbol 2
      //Target pos right 
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Target_pos: 'right', BlposX: 'left', data: {Target_Symbol: "pawn",RuleType: "Corona"}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Target_pos: 'right', BlposX: 'left', data: {Target_Symbol: "pawn",RuleType: "Everyday"}},
      // Target pos left
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Target_pos: 'left', BlposX: 'left', data: {Target_Symbol: "pawn",RuleType: "Corona"}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Target_pos: 'left', BlposX: 'left', data: {Target_Symbol: "pawn",RuleType: "Everyday"}},
//Time Bonus + 10
  // Block pos right
    // Target Symbol 1
      // Target pos right
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Target_pos: 'right', BlposX: 'right', data: {Target_Symbol: "king",RuleType: "Corona"}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Target_pos: 'right', BlposX: 'right', data: {Target_Symbol: "king",RuleType: "Everyday"}},
      // Target pos left
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Target_pos: 'left', BlposX: 'right', data: {Target_Symbol: "king",RuleType: "Corona"}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Target_pos: 'left', BlposX: 'right', data: {Target_Symbol: "king",RuleType: "Everyday"}},
    // Target Symbol 2
      //Target pos right 
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Target_pos: 'right', BlposX: 'right', data: {Target_Symbol: "pawn",RuleType: "Corona"}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Target_pos: 'right', BlposX: 'right', data: {Target_Symbol: "pawn",RuleType: "Everyday"}},
      // Target pos left
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Target_pos: 'left', BlposX: 'right', data: {Target_Symbol: "pawn",RuleType: "Corona"}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Target_pos: 'left', BlposX: 'right', data: {Target_Symbol: "pawn",RuleType: "Everyday"}},
  // Block pos left
    // Target Symbol 1
      // Target pos right
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Target_pos: 'right', BlposX: 'left', data: {Target_Symbol: "king",RuleType: "Corona"}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Target_pos: 'right', BlposX: 'left', data: {Target_Symbol: "king",RuleType: "Everyday"}},
      // Target pos left
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Target_pos: 'left', BlposX: 'left', data: {Target_Symbol: "king",RuleType: "Corona"}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Target_pos: 'left', BlposX: 'left', data: {Target_Symbol: "king",RuleType: "Everyday"}},
    // Target Symbol 2
      //Target pos right 
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Target_pos: 'right', BlposX: 'left', data: {Target_Symbol: "pawn",RuleType: "Corona"}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Target_pos: 'right', BlposX: 'left', data: {Target_Symbol: "pawn",RuleType: "Everyday"}},
      // Target pos left
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Target_pos: 'left', BlposX: 'left', data: {Target_Symbol: "pawn",RuleType: "Corona"}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Target_pos: 'left', BlposX: 'left', data: {Target_Symbol: "pawn",RuleType: "Everyday"}},           
    
]

/* #################### general experiment setup #################### */
const KEYS = {
    CONTINUE: "ENTER",
} 

// initial settings for variables
var timeline = [];
var urlvar = jsPsych.data.urlVariables();
var exp_part;
var exp_part_current;
var BlockNumber = 1;
var TrialNumber = 0;
var TrialNumberBlock = 0;

// initialize variables to record browser interactions
var pause = false; // is the experiment paused?
var n_blur = 0;

// initialize variables for informed consent and abortion of experiment
var consent = false;
var experiment_aborted = false; 

/* #################### participant setup #################### */
//Create ID by combining 15 random numbers 
const ID = jsPsych.randomization.randomID(15);
jsPsych.data.addProperties({subject: ID});

console.log("setup imported successfully.")

/*
Credit: Jonas Plate & Salomé Li Keintzel
*/