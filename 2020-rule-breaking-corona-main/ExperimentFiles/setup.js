/*
This file 
- declares and initialized constants, basic variables 
- participant set-up
*/

// images and stimuli used in the experiment
var Blockade_C ='img/Face_Mask.png'
var Blockade_N = "img/Zutritt_verboten.png"
var Symbol_1 ="img/King_2.png"
var Symbol_2 = "img/pawn.png"
var Police = "img/Police.png"
var Star = "img/Star.png"
var images = [Blockade_C,Blockade_N, Symbol_1, Symbol_2,Police, Star]
var trespasses = 0
var MT_mean = 0
var correct_trials = 0
/* test trials */

var test_stimuli = [
// Time Bonus + 1
  // Block pos right
    // Aim Symbol 1
      // Aim pos right
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Aim_pos: 'right', BlposX: 'right', data: {Blockade: Blockade_C}},
{time_Bonus: 1,blockade: {file: Blockade_N,} ,Symbol: [Symbol_1, Symbol_2] ,Aim_pos: 'right', BlposX: 'right', data: {Blockade: Blockade_N}},
      // Aim pos left
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Aim_pos: 'left', BlposX: 'right', data: {Blockade: Blockade_C}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Aim_pos: 'left', BlposX: 'right', data: {Blockade: Blockade_N}},
    // Aim Symbol 2
      //Aim pos right 
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Aim_pos: 'right', BlposX: 'right', data: {Blockade: Blockade_C}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Aim_pos: 'right', BlposX: 'right', data: {Blockade: Blockade_N}},
      // Aim pos left
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Aim_pos: 'left', BlposX: 'right', data: {Blockade: Blockade_C}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Aim_pos: 'left', BlposX: 'right', data: {Blockade: Blockade_N}},
  // Block pos left
    // Aim Symbol 1
      // Aim pos right
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Aim_pos: 'right', BlposX: 'left', data: {Blockade: Blockade_C}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Aim_pos: 'right', BlposX: 'left', data: {Blockade: Blockade_N}},
      // Aim pos left
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Aim_pos: 'left', BlposX: 'left', data: {Blockade: Blockade_C}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Aim_pos: 'left', BlposX: 'left', data: {Blockade: Blockade_N}},
    // Aim Symbol 2
      //Aim pos right 
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Aim_pos: 'right', BlposX: 'left', data: {Blockade: Blockade_C}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Aim_pos: 'right', BlposX: 'left', data: {Blockade: Blockade_N}},
      // Aim pos left
{time_Bonus: 1,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Aim_pos: 'left', BlposX: 'left', data: {Blockade: Blockade_C}},
{time_Bonus: 1,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Aim_pos: 'left', BlposX: 'left', data: {Blockade: Blockade_N}},
//Time Bonus + 10
  // Block pos right
    // Aim Symbol 1
      // Aim pos right
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Aim_pos: 'right', BlposX: 'right', data: {Blockade: Blockade_C}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Aim_pos: 'right', BlposX: 'right', data: {Blockade: Blockade_N}},
      // Aim pos left
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Aim_pos: 'left', BlposX: 'right', data: {Blockade: Blockade_C}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Aim_pos: 'left', BlposX: 'right', data: {Blockade: Blockade_N}},
    // Aim Symbol 2
      //Aim pos right 
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Aim_pos: 'right', BlposX: 'right', data: {Blockade: Blockade_C}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Aim_pos: 'right', BlposX: 'right', data: {Blockade: Blockade_N}},
      // Aim pos left
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Aim_pos: 'left', BlposX: 'right', data: {Blockade: Blockade_C}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Aim_pos: 'left', BlposX: 'right', data: {Blockade: Blockade_N}},
  // Block pos left
    // Aim Symbol 1
      // Aim pos right
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Aim_pos: 'right', BlposX: 'left', data: {Blockade: Blockade_C}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Aim_pos: 'right', BlposX: 'left', data: {Blockade: Blockade_N}},
      // Aim pos left
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol: [Symbol_1, Symbol_2], Aim_pos: 'left', BlposX: 'left', data: {Blockade: Blockade_C}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol: [Symbol_1, Symbol_2] ,Aim_pos: 'left', BlposX: 'left', data: {Blockade: Blockade_N}},
    // Aim Symbol 2
      //Aim pos right 
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Aim_pos: 'right', BlposX: 'left', data: {Blockade: Blockade_C}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Aim_pos: 'right', BlposX: 'left', data: {Blockade: Blockade_N}},
      // Aim pos left
{time_Bonus: 10,blockade: {file: Blockade_C}, Symbol:[Symbol_2, Symbol_1], Aim_pos: 'left', BlposX: 'left', data: {Blockade: Blockade_C}},
{time_Bonus: 10,blockade: {file: Blockade_N,},Symbol:[Symbol_2, Symbol_1], Aim_pos: 'left', BlposX: 'left', data: {Blockade: Blockade_N}},           
    
]


// key responses
const KEYS = {
    CONTINUE: "ENTER",
} 







// initial settings for variables
var timeline = [];
var exp_part_current;
var urlvar = jsPsych.data.urlVariables();
var exp_part;


// initialize variables to record browser interactions
var pause = false; // is the experiment paused?
var n_blur = 0;

// initialize variables for informed consent and abortion of experiment
var consent = false;
var education_text = false;
var experiment_aborted = false; 



/* ##########################################################################
       participant set-up
########################################################################## */

//Create ID by combining 15 random numbers 
const ID = jsPsych.randomization.randomID(15);
jsPsych.data.addProperties({subject: ID});

//vp_setup(ID);

console.log("setup imported successfully.")