/*
This file contains the first instuction for the corsi task.

Author: Hannah Dames
Co-Authors:
    Florian Gouret
    Marie Jakob <mjakob@cs.uni-freiburg.de>

Supervision: Hannah Dames, Christina Pfeuffer

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, April 2020
*/

/*Corsi Instruktion 1*/
var instr_corsi_1 = {
    type: "html-keyboard-response",
    stimulus: "<div align=left> Before we will continue with the previous task, we ask you to perform a <strong>visual memory task </strong> in between.<br> <br>"+
    "The following test was designed to measure your spatial memory capacity. <br> <br>"+
    "For this part of the experiment, please use your computer mouse.<br>" +
    "First, you will see some grey squares on the screen.<br>" +
    "Next, some squares will sequentially light up in a red.<br><br>"+
    "It is your task to remember the sequence in which the squares lit up red.<br>" +
    "After a sequence of red squares has finished, you will see the text <strong>'Repeat!'</strong>.<br>"+ 
    "When you do, please repeat the sequence in which the red squares had lit up by <br>"+
    "clicking on the corresponding squares in the same order as they lit up in red before.<br>" +
    "Please take care not to miss the squares when clicking on them!<br><br>" +
    "At the beginning of each new sequence, you will receive a note that a new sequence is about to start <br>" +
    "In addition, you will be told the length of this sequence and see the instruction <strong>Remember!</strong>.<br>"+
    "This indicates that you should remember to upcoming sequence. <br><br>"+
    "Please note: This part of the experiment will automatically end after some time <br>"+
    "and the rest of the experiment will continue.<br><br>"+
        "Press SPACE to CONTINUE</div>",
    choices: ["space"],
    // choices: [KEYS.CONTINUE],
    data: {exp_part: "instr"},
    on_load: function() {
       pause = true;
    }, 
    on_finish: function(data) {
     pause = false;
      reset_corsi();
      time_so_far = data.time_elapsed;
        console.log("time so far: ",  time_so_far);
       console.log("num spaces: ", num_spaces);
       console.log("n_span: ", n_span);
    }
};