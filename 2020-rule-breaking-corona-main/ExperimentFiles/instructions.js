/*
This file contains the instructions.
*/

/*
* welcome
*/

var welcome_1 = {
    type: "html-keyboard-response",
    stimulus: "Willkommen ! :)" +
    "Drücke XX um mit dem Experiment zu beginnen. </div>",
    /*choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "welcome";
        pause = true;
    },
    on_finish: function() {
        pause = false;
        console.log(urlvar.participant); // logs participant ID
    },*/
};

var instruction_1 = {
    type: "html-keyboard-response",
    stimulus: "Erste Instruktionen" +
    "Drücke XX um mit dem Experiment zu beginnen. </div>",
    /*choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "welcome";
        pause = true;
    },
    on_finish: function() {
        pause = false;
        console.log(urlvar.participant); // logs participant ID
    },*/
};

var instruction_2 = {
    type: "html-keyboard-response",
    stimulus: "Instruktionen vor der richtigen Übung" +
    "Drücke XX um mit dem Experiment zu beginnen. </div>",
    /*choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "welcome";
        pause = true;
    },
    on_finish: function() {
        pause = false;
        console.log(urlvar.participant); // logs participant ID
    },*/
};

var instruction_end = {
    type: "html-keyboard-response",
    stimulus: "Ende der Instruktionen. Experiment geht los" +
    "Drücke XX um mit dem Experiment zu beginnen. </div>",
    /*choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "welcome";
        pause = true;
    },
    on_finish: function() {
        pause = false;
        console.log(urlvar.participant); // logs participant ID
    },*/
};
//informed consent

//instructions here

console.log("instructions imported successfully.")

