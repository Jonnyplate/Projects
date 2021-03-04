/*
This file contains the instructions for both DF experiments.
*/

/* ##########################################################################
                                Welcome
########################################################################## */

/*----------------------------- Welcome 1 ---------------------------------*/
var welcome_1 = {
    type: "html-keyboard-response",
    stimulus: "<div align=left>Dear participant, <br> " +
    "thank you for participating in an online study of the Cognition, Action, and Sustainability Unit of the University of Freiburg! <br> <br>" +
    "The aim of this study is to examine our ability to remember previously learned information. <br>" +
    "Our goal is to find out, whether our memory improves, when we only remember information that is relevant to us. <br>" +
    "The experiment will take about 35 minutes to complete. <br> <br>" +
    "Please, note that you can only participate in this study if you are using a device with a keyboard (PC, Laptop etc.) <br>" +
    "and not if you are using a mobile device such as a tablet or smartphone.<br> <br>" +
    "Press 'SPACE' to proceed to the experiment. </div>",
    choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "welcome";
        pause = true;
    },
    on_finish: function() {
        pause = false;
        console.log(urlvar.participant); // logs participant ID
    },
};


/*---------------------------- Welcome 2 ----------------------------------*/

var welcome_2 = {
       type: "html-keyboard-response",
       stimulus: "<div align=left><strong> Time Course of this experiment: </strong> <br><br> " +
       "<strong> 1.</strong>  First, please fill in some information regarding your demographic data. <br><br> " +
       "<strong> 2.</strong>  Next, your task will be to classify everyday objects. <br>" +
       "In addition, you will be asked to remember certain objects and recall them later. <br>" +
       "Working on these tasks requires your undivided attention and concentration.<br>" +
       "It is therefore essential that you eliminate any sources of distraction in your  <br>" +
       "environment and ensure that you will not be disturbed. <br><br>" +
       "<strong> 3.</strong>  At the end of the experiment, you will be asked to answer a few additional questions. <br> <br>" + 
       "<strong> Important:</strong> After finishing the experiment, only close the browser window <br> "+
       "by clicking on the 'end the experiment'-button when you are asked to do so. <br>"+
       "Closing the browser window prematurely will make the allocation of your "+
       "participation credit impossible. <br><br> " +
       "Press 'SPACE' to start the experiment. </div>",
    choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "welcome";
        pause = true;
    },
    on_finish: function() {
        pause = false;
    }
};


/*-------------------------- Informed Consent --------------------------------*/


var welcome_3 = {
    type: "html-button-response",
    stimulus: "<div align=left><strong> Informed consent </strong>  <br>" +
        "The aim of our research is to better understand human behavior and mental processes. <br>" +
        "In the following study your behavior (e.g. choices, reaction times) will be studied. <br> <br>" +
        "<strong> Voluntariness and Anonymity </strong> <br>" +
        "Your participation in this study is  <strong> voluntary</strong>.<br>" +
        "You may withdraw your consent to participate at any time without providing a reason " +
        "for doing so and without fear of prejudice. <br><br>" + 
        "As no personal data will be collected, <strong>your data and your person cannot be " +
        "connected after data collection</strong> – the data-set is anonymous. <br>" +
        "Respectively, deletion of your data will not be possible after data collection has been " +
        "completed, as we cannot retrace your data-set.<br>"+
        "The results and anonymized data collected in this study will be published as a " +
        "scientific publication. <br>" +
        "This will happen in an <strong>anonymized format</strong>, so that no data can be " +
        "traced back to a specific person. <br> <br>" +
        "The anonymized data of this study will be made available to other researchers " +
        "and/or in a data archive on the Internet as a means of transparency and to enable subsequent re-use. " +
        "By doing so, this study follows the recommendations of the " + 
        "Deutsche Forschungsgemeinschaft (DFG, German Research Foundation) and " +
        "Deutsche Gesellschaft für Psychologie (DGPS, German Psychological Society) regarding quality " +
        "assurance in research.<br>" +
        "If you have any questions now or after the experiment, please contact " +
        "our team (experiments@cs.uni-freiburg.de).<br><br><br>" +


        "I hereby declare, that I understand the above described conditions of participation " +
        "and I agree to participate under these conditions. <br><br> </div>",
        choices: ['I agree', 'I do <strong>not</strong> agree'],
        on_load: function() {
            $('body').css('cursor', 'default');
            pause = true;
            exp_part_current = "welcome";
        },
        on_finish: function(data){
            $('body').css('cursor', 'none');
            pause = false;
            if(data.button_pressed == 1){
                consent = false;
                jsPsych.endExperiment('As you did not agree to participate under the described ' +
                'conditions,<br> this study ends here.');
            } else {
                consent = true;
            }
        }   
};


/*------------------------------ Welcome 3 -----------------------------------*/
var welcome_4 = {
    type: "html-keyboard-response",
    stimulus: "<div align=left><strong> General information concerning the experiment </strong>  <br> <br>" +
    "Please follow the instructions:"+
    "<ol> <li><strong> Do not leave this tab (your browser window) during the experiment and do not reload this tab! </strong>  <br>" +
    "If you do switch tabs/windows during the experiment (to check your mail or visit another website, for example), <br>" +
    "the experiment will end automatically and you will <strong>not receive credit</strong> for your participation. <br>" +
    "Repeated participation or resumption of the experiment is impossible.</li> <br>" +
    "<li>Please close all other programs for the duration of your participation. </li> <br>" +
    "<li>Please mute or turn off your phone and put it out of your reach. </li> <br>" +
    "<li>Please also take off any disturbing accessories (such as wristwatches, bracelets, etc.). </li> <br>" +
    "<li>If you have music playing in the background, please turn it off now. </li> <br></ol>" +
    "Thank you! <br>" +
    "Press 'SPACE' to continue. </div>",
    choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "welcome";
        pause = true;
    },
    on_finish: function() {
        pause = false;
    }
};


/*--------------------------------------Instruktion 1-----------------------------------------*/

var instruction_1 = {
    type: "html-keyboard-response",
    stimulus:"<div align=left> The experiment is now about to start: <br> <br>"+
    "In the following part, you will be presented pictures of everyday objects. <br>" +
    "Your first task is to <strong>classify these objects. </strong> <br> <br> "+
    "You will classify them either as mechanical or non-mechanical objects. <br> <br>"+
    "Objects that include any kind of technical mechanism (for example, wheels, switches, levers, <br> " +
    "electronic components) fall under the category of <strong>mechanical</strong> objects. <br>" +
    "Only objects without any kind of technical mechanism should be classified as <strong>non-mechanical</strong>. <br><br>"+
    "Press 'SPACE' to continue. </div>",
    choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "instructions";
        pause = true;
    },
    on_finish: function() {
        pause = false;
    }
};
    

/*----------------------------------------Instruktion 2-------------------------------------------*/


var instruction_2 ={
    type: "html-keyboard-response",
    stimulus: "<div align=justify>You will classify the objects using the <strong>'S'</strong> and the <strong>'L'</strong> keys on your keyboard.<br>" +
    "For doing so, please place your <strong>left index finger</strong> on the <strong>'S'</strong> key " +
    "and place your <strong>right index finger</strong> on the <strong>'L'</strong> key. <br><br> " +
    "Each trial starts with an instruction, indicating which key ('S'/'L') you need to press to classify <br>" +
    "the object as mechanical (letter M) or non-mechanical (letter N).<br>"+
    "The instruction <strong>M + N</strong> indicates that, in the current trial, " + 
    "by pressing the left key ('S') you classify the displayed object as mechanical (M) <br> "+
    "and by pressing the right key ('L') you classify the object as non-mechanical (N). <br>" +
    "The instruction <strong>N + M</strong> on the other hand indicates that by pressing the left key ('S') "+
    "you classify the displayed object as non-mechanical (N) <br> and by pressing the right key ('L') you classify the object as mechanical (M). <br><br>" +
    "Please press the key corresponding to the correct classification as fast as possible as soon as the object is displayed and try to avoid making mistakes.<br>"+
    "If you do not respond within a 2 second window, a corresponding feedback will be displayed and the next trial will start.<br> " +
    "The experiment is divided into multiple blocks to give you the opportunity to take a break after each block. <br>" +
    "First, you can now practice this task. <br><br>" +
    "Please place your <strong>LEFT INDEX FINGER</strong> on the 'S' key and your <strong>RIGHT INDEX FINGER</strong> on the 'L' key now. <br><br>" +
    "Press SPACE to continue.</div>",
    choices:  [KEYS.CONTINUE],
    on_load: function() {
        pause = true;
        exp_part_current = "instructions";
    },
    on_finish: function() {
        pause = false;
    }
};
/* ############################################################################################
        Practice
   ############################################################################################ */

/*------------------------------ Instruction Practice 1 --------------------------------------*/




/*Übung 1*/

var practice_instruction_1 ={
    type: "html-keyboard-response",
    stimulus: "<div align=left> You will now have time to practice this task.<br><br>"+
    "Remember: <br> <br>"+
    "<li>Please place your index fingers on the <strong>'S'</strong> and <strong>'L'</strong> keys <br>" +
    "to respond as fast and accurately as possible.</li>"+
    "<li>Every picture can be classified as either mechanical or non-mechanical.</li>"+
    "<li>If you do not respond in time or commit an error, you will receive a corresponding feedback. </li>" +
    "<li> Please try to respond as <strong> fast </strong> and as <strong> accurately as possible </strong> .<br>" +
    "<li>To ensure optimal results, please minimize distractions and stay focused. </li><br><br>"+
    "Press SPACE to continue.</div>",
    choices:  [KEYS.CONTINUE],
    data: {exp_part: "instr"},
    on_load: function() {
        pause = true;
        exp_part_current = "instructions";
    },
    on_finish: function() {
        pause = false;
    }
};

/*Übung 1*/

var instr_after_practice_1 = {
    type: "html-keyboard-response",
    stimulus: "<div align=left> Great!<br><br>"+
    "Are you ready to continue?<br><br>"+
    "If you want to reread the instructions and redo the practice trials, <br>" +
    "please press „Z“. <br><br>"+ 
    "Press SPACE to CONTINUE with the experiment when you are ready. </div>",
        choices: [KEYS.CONTINUE, KEYS.BACK],
        data: {exp_part: "instr"},
        on_load: function() {
            pause = true;
            exp_part_current = "instructions";
        },
        on_finish: function() {
            pause = false;
            block = "practice_forget";
            prime -= 1;
        }
    };


/*Instruktion 3*/

var instruction_3 ={
    type: "html-keyboard-response",
    stimulus: "<div align=left>Great!<br>"+
    " <strong>Attention</strong>! You will now receive a second, additional task! <br><br>"+
    "To this point it was you <strong>first task</strong> to correctly <strong>classify objects</strong>. <br><br>"+
    "As mentioned in the beginning, we aim to examine how well humans can " +
    "remember previously learned information.<br>" +
    "We would like to find out whether our memory improves if we only " +
    "remember information that is relevant to us. <br><br>" +
    "Therefore, your <strong>second task</strong> will be to " +
    "<strong>remember</strong> the pictures you are to categorize. <br> " +
    "After the learning phase, there will be a memory test phase, in which you will be asked " +
    "to indicate whether you have seen a picture before or not. <br>" +
    "Some, but not all pictures shown in the learning phase will appear in the memory test phase.<br>" +
    "After classifying a picture, you will be told " +
    "whether you should remember it for the memory test phase or not. <br>" +
    "Thus, some pictures can be forgotten, whereas others have to be remembered. <br><br>" +
    "Note: From now on, feedback will only be displayed if you responded incorrectly or not in time.<br><br>" +
    "Press SPACE to continue.</div>",
    choices: [KEYS.CONTINUE],
    data: {exp_part: "instr"},
    on_load: function() {
        pause = true;
        exp_part_current = "instructions";
    },
    on_finish: function() {
        pause = false;
    }
};


/*Instruktion 4*/

var instruction_4={
    type: "html-keyboard-response",
    stimulus: "<div align=left>In the following part, you will thus have to remember only some pictures. <br>" +
    "Immediately after seeing and classifying " +
    "the picture, a symbol will be displayed, indicating whether you " +
    "should remember or forget the previous picture. <br><br>" +
    "A <span style='color: dodgerblue; font-size: 28px'>O</span> indicates REMEMBER. " +
    "That means, you have to remember this picture, because it will be tested later. <br><br>" +
    "A <span style='color: darkorange; font-size:28px'>Ø</span> indicates FORGET. " +
    "You do not have to remember this picture. <br><br> " +
    "As you will have to remember a lot of pictures, it will be hard for you to " +
    "remember all of them. <br>It will put you at an advantage if you instantly forget " +
    "the pictures you are not asked to remember. <br> " +
    "This will make it easier for you to remember the pictures that will be tested afterwards. <br><br>" +
    "Press SPACE to continue.</div>",
    choices: [KEYS.CONTINUE],
    data: {exp_part: "instr"},
    on_load: function() {
        pause = true;
        exp_part_current = "instructions";
    },
    on_finish: function() {
        pause = false;
    }
};
    

/*Übung 2*/

var practice_instruction_3 ={
    type: "html-keyboard-response",
    stimulus: "<div align=left> Now you have the chance to practice both tasks together.<br><br>"+
    "Remember: <br> <br>"+
    "<li>Please place your index fingers on the <strong>'S'</strong> and <strong>'L'</strong> keys <br>" +
    "to respond as fast and accurately as possible.</li>"+
    "<li>Every picture can be classified as either mechanical or non-mechanical.</li>"+
    "<li>If you do not respond in time or commit an error, you will receive a corresponding feedback. <br>"+
    "Please try to respond as <strong> fast </strong> and as <strong> accurately as possible </strong>.</li>"+
    "<li> Please remember only the to-be-remembered <span style='color: dodgerblue; font-size: 28px'>O</span> pictures. <br></li>"+ 
    "<li> Please minimize distractions and stay focused. </li><br><br>"+
    "Press SPACE to START</div>",

    choices: [KEYS.CONTINUE],
    data: {exp_part: "instr"},
    on_load: function() {
        pause = true;
        exp_part_current = "instructions";
    },
    on_finish: function() {
        pause = false;
    }
};

/*Übung zwei Erinnerungstest*/

var practice_instruction_4 = {
    type: "html-keyboard-response",
    stimulus: "<div align=left> Now, to practice, we kindly ask you to remember as many of the to-be-remembered pictures<br>"+
    "of the previous learning phase as possible.<br><br>"+
    "The pictures you were instructed to remember were the pictures followed by a <span style='color: dodgerblue; font-size: 28px'>O</span>.<br><br>"+
    "In this memory test phase, you will also see some new pictures.<br>" +
    "It is your task to remember whether you were presented with this specific picture in this study so far or not.<br>" +
    "If you recognize an object (you have already seen it in this study), it is an OLD object. <br>" +
    "If you do not recognize an object (you have NOT seen it in this study), it is a NEW object. <br>" +
    "<strong> Attention</strong>: As already mentioned, <span style='color: darkorange; font-size:28px'>Ø</span>-pictures will <strong>never</strong> appear in this memory test (neither as new objects). <br><br>"+
    "Press SPACE to continue. </div>",
    choices: [KEYS.CONTINUE],
    data: {exp_part: "instr"},
    on_load: function() {
        pause = true;
        exp_part_current = "instructions";
    },
    on_finish: function() {
        pause = false;
    }
};

var practice_instruction_5 = {
type: "html-keyboard-response",
stimulus: function(){
    if (practice_stimuli[0]["left_key"] == "Alt: ") {
        old_label = "left";
        new_label = "right";
    } else {
        old_label = "right";
        new_label = "left";
    }
    return "<div align=left> M and N no longer will appear on the left/right of the fixation cross. <br>"+
        "Instead there will be a note at the bottom of the left or right side  <br>" +
        "indicating which key you should press for an old or new object:  <br> <br>" +
        "Press the <strong>" + old_label + "</strong> key to classify an object as <strong>old</strong> " +
        "and press the <strong>" + new_label + "</strong>, to classify an object as <strong>new</strong>.<br>" +
        
        "Please classify the objects as new/old by again placing your index finger on the 'S' and 'L' keys <br>" +
        "and press them accordingly.<br><br>"+
        "<strong>Old:</strong> This object has been presented before. <br>" +
        "<strong>New:</strong> This object has <strong>not</strong> been presented.<br><br>"+

        "Now please put your right and left index fingers on the 'S' and 'L' keys of your keyboard. <br>" + 
        "Please respond as fast and as accurately as possible!<br><br>"+
        "Press SPACE to continue. </div>"
},
choices: [KEYS.CONTINUE],
data: {exp_part: "instr"},
on_load: function() {
    pause = true;
    exp_part_current = "instructions";
},
on_finish: function() {
    pause = false;
    block = "practice_recog";
}
};

/*After Recognition Test Phase Instruction*/

var instr_after_practice_2 = {
    type: "html-keyboard-response",
    stimulus: "<div align=left> Great!<br><br>"+
    "Are you ready to continue?<br>"+
    "If you want to reread the instructions and redo the practice trials, please <br>" +
    "press „Z“.<br><br>"+
    "You can proceed when you are ready.<br><br>"+
    "After the presentation of each object, you will receive an instruction whether to <br>"+
    "remember or to forget the object.<br>" +        
    "We will test your memory of the following pictures only at the very end of <br>"+
    "the experiment after all learning blocks are completed. <br><br>" +
    "Press SPACE to CONTINUE when you are ready. </div>",
    choices: [KEYS.CONTINUE, KEYS.BACK],
    data: {exp_part: "instr"},
    on_load: function() {
        pause = true;
        exp_part_current = "instructions";
    },
    on_finish: function() {
        pause = false;
        prime -= 1
    }
};
    

/*------------------------------ Prime Instruktionen----------------------------*/

var instruction_6 = {
    type: "html-keyboard-response",
    stimulus: "<div align=left> The actual experiment is about to start.<br>"+
    "The practice trials are over!<br><br>"+
    "Please always respond both fast and accurately!<br><br>"+
    "Remember: <br> <br>"+
    "<li> Please place your index fingers on the <strong>'S'</strong> and <strong>'L'</strong> keys <br>" +
    "to respond as fast and accurately as possible.</li>"+
    "<li> Every picture can be classified as either mechanical or non-mechanical.</li>"+
    "<li> If you do not respond in time or commit an error, you will receive a corresponding feedback.<br>" +
    " Please try to respond as <strong> fast </strong> and as <strong> accurately as possible </strong>.</li>"+
    "<li> Remember the <span style='color: dodgerblue; font-size: 28px'>O</span> pictures. <br></li>" +
    "<li> Please minimize distractions and stay focused. </li><br><br>"+
    "Press SPACE to START.</div>",
choices: [KEYS.CONTINUE],
data: {exp_part: "instr"},
on_load: function() {
    pause = true;
    exp_part_current = "instructions";
},
on_finish: function() {
    pause = false;    
    block = "prime"+prime
    }
};


/*-----------------------------------Layout Feedbackseite---------------------------------*/

var instr_break_feedback = {
    type: "html-keyboard-response",
    stimulus: function() {
        var trials = jsPsych.data.getLastTimelineData().filter({trial_part: 'test'});
        var n_trials = jsPsych.data.get().filter({trial_part: 'test'}).count();
        var n_too_slow = trials.filter({key_press: null}).count()
        var n_errors = trials.filter({correct: false, key_press: KEYS_JS.LEFT}).count() +
            trials.filter({correct: false, key_press: KEYS_JS.RIGHT}).count()
        return "<p style='font-size: 32px;'>Break</>" +
            "<br><br><br><br><br>" +
            "<p style='font-size: 24px;'>In the last block, you committed " + n_errors + " errors" +
            " and did not respond in time on " + n_too_slow + " trials.\n</p>" +
            "<p style='font-size: 24px;'>Try to respond as fast and accurately as possible in the next " +
            "block as well! </p>" +
            "<p style='font-size: 24px;'>Press SPACE to continue.</p>"
    },
    data: {exp_part: "break"},
    choices: [KEYS.CONTINUE],
    on_load: function() {
        pause = true;
        exp_part_current = "break";
    },
    on_finish: function() {
        pause = false;
        block_num += 1;
        prime += 1;
        block = "prime" + prime;
        console.log(block_num)
        console.log(block)
    }
};
/*------------------------------Instruktionen Pausenseite-------------------------------*/

var end_break = {
    type: "html-keyboard-response",
    stimulus: function() {
        var trials = jsPsych.data.getLastTimelineData().filter({trial_part: 'test'});
        var n_trials = jsPsych.data.get().filter({trial_part: 'test'}).count();
        var n_too_slow = trials.filter({key_press: null}).count()
        var n_errors = trials.filter({correct: false, key_press: KEYS_JS.LEFT}).count() +
            trials.filter({correct: false, key_press: KEYS_JS.RIGHT}).count()

        return "<p style='font-size: 32px;'>Break</>" +
            "<br><br><br><br><br>" +
            "<p style='font-size: 24px;'>In the last block you committed " + n_errors + " errors" +
            " and did not respond in time on " + n_too_slow + " trials.\n</p>" +
            "<p style='font-size: 24px;'>Before we will continue with the experiment, we ask you to perform a <strong>short intermediate task</strong>. </p>" +
            "<p style='font-size: 24px;'> Press SPACE to continue. </p>"
    },
    data: {exp_part: "break"},
    choices: [KEYS.CONTINUE],
    on_load: function() {
        pause = true;
        exp_part_current = "break";
    },
    on_finish: function() {
        pause = false;
        block = "corsi";
        block_num += 1;
    }
};


/*----------------------------------Corsi Instruktion 1-----------------------------------------*/
var corsi_instruction_1 = {
    type: "html-keyboard-response",
    stimulus: "<div align=left> Before we will continue with the previous task, we ask you to perform a <strong>short intermediate task</strong>.<br> <br>"+
    "The following test was designed to measure your spatial memory capacity. <br> <br>"+
    "For this part of the experiment, please use your computer mouse.<br>" +
    "First, you will see some grey squares on the screen.<br>" +
    "Next, some squares will sequentially light up in red.<br><br>"+
    "It is your task to remember the sequence in which the squares lit up red.<br>" +
    "After a sequence of red squares has finished, you will see the text <strong>'Repeat!'</strong>.<br>"+ 
    "When you do, please repeat the sequence in which the red squares had lit up by <br>"+
    "clicking on the corresponding squares in the same order as they lit up in red before.<br>" +
    "Please take care not to miss the squares when clicking on them!<br><br>" +
    "At the beginning of each new sequence, you will receive a note that a new sequence is about to start <br>" +
    "In addition, you will be told the length of this sequence and see the instruction <strong>'Remember!'</strong>.<br>"+
    "This indicates that you should remember the upcoming sequence. <br><br>"+
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


/*------------------------Lernwiederholung------------------------------*/

const instr_probe = {
    type: "html-keyboard-response",
    stimulus: "<div align=left> Great, this task is now finished and the rest of the experiment continues. <br>" +
    "In the following, please perform the task from the beginning of the study one last time. <br><br>" +

    "<strong>Please note: </strong>At the beginning of the experiment we told you <br>"+
    "that you should remember certain objects for a memory test.<br>" +
    "In fact, there will be <strong>no memory test: </strong> <br>"+
    "In this experiment we were only interested in finding out <br>"+
    "how fast or slow you react to objects to-be-forgotten or to-be-remembered. <br>"+
    "We will inform you in detail about our motives right after the end of our study.<br><br>" +
    "Now, we kindly ask you to again classify all the pictures <strong>as fast and accurately as possible</strong> <br> "+
    "according to the categories <strong> mechanical and non-mechanical</strong>. <br>" + 
    "Since there will be no memory test at the end of the study, you will no longer receive<br>" + 
    "a reminder to memorize or forget the objects. <br>" +
    "Just as in the first practice phase, concentrate on the classification of the objects. <br>" +
    "You do <strong>not</strong> have to memorize the objects anymore. <br><br>" + 
    "To respond, please place your index fingers back on the <strong> 'S' and 'L' keys</strong>. <br><br>" +
    "Press SPACE to start.</div>",
    choices: [KEYS.CONTINUE],
    data: {exp_part: "instr"},
    // before the probe block, response mappings and correct responses for the
    // switch trials are updated:
    on_load: function() {
        exp_part_current = "instructions";
        pause = true;
    },
    on_finish: function() {
        pause = false;
        console.log("entering the probe block");
        console.log(block_num);
        for (let i in stimuli_learning_phase) {
            if (stimuli_learning_phase[i]["probe_condition"] === "switch") {
                console.log("switching responses...");
                console.log("Old: ", stimuli_learning_phase[i]["resp_map"]);
                if (stimuli_learning_phase[i]["resp_map"] === "N + M") {
                    stimuli_learning_phase[i]["resp_map"] = "M + N";
                } else {
                    stimuli_learning_phase[i]["resp_map"] = "N + M";
                }
                if (stimuli_learning_phase[i]["correct_resp"] === KEYS_JS.LEFT) {
                    stimuli_learning_phase[i]["correct_resp"] = KEYS_JS.RIGHT;
                } else {
                    stimuli_learning_phase[i]["correct_resp"] = KEYS_JS.LEFT;
                }
                console.log("New: ", stimuli_learning_phase[i]["resp_map"]);
                console.log(stimuli_learning_phase[i]);
                
                block = "probe"+probe_num;
                block_num += 1;
            }

        }
    }
};

/*-----------------------------------Probe Feedbackseite---------------------------------*/

var instr_break_feedback_probe = {
    type: "html-keyboard-response",
    stimulus: function() {
        var trials = jsPsych.data.getLastTimelineData().filter({trial_part: 'test'});
        var n_trials = jsPsych.data.get().filter({trial_part: 'test'}).count();
        var n_too_slow = trials.filter({key_press: null}).count()
        var n_errors = trials.filter({correct: false, key_press: KEYS_JS.LEFT}).count() +
            trials.filter({correct: false, key_press: KEYS_JS.RIGHT}).count()

        return "<p style='font-size: 32px;'>Break</>" +
            "<br><br><br><br><br>" +
            "<p style='font-size: 24px;'>In the last block you committed " + n_errors + " errors" +
            " and did not respond in time on " + n_too_slow + " trials.\n</p>" +
            "<p style='font-size: 24px;'>Please, also try to respond as accurate and as quickly as possible in the next block.  </p>" +
            "<br>" +
            "<p style='font-size: 24px;'>Press SPACE to continue.</p>"
    },
    data: {exp_part: "break"},
    choices: [KEYS.CONTINUE],
    on_load: function() {
        pause = true;
        exp_part_current = "break";
    },
    on_finish: function() {
        pause = false;
        block = "probe" + probe_num;
        block_num += 1;
        probe_num += 1;
        console.log(block_num)
        console.log(block)
    }
};
/*--------------------------------Probe Ende-Seite--------------------------------*/


var instr_end_probe = {
    type: "html-keyboard-response",
    stimulus: function() {
        var trials = jsPsych.data.getLastTimelineData().filter({trial_part: 'test'});
        var n_trials = jsPsych.data.get().filter({trial_part: 'test'}).count();
        var n_too_slow = trials.filter({key_press: null}).count()
        var n_errors = trials.filter({correct: false, key_press: KEYS_JS.LEFT}).count() +
            trials.filter({correct: false, key_press: KEYS_JS.RIGHT}).count()

        return "<p style='font-size: 32px;'>Break</>" +
            "<br><br><br><br><br>" +
            "<p style='font-size: 24px;'>In the last block you committed " + n_errors + " errors" +
            " and did not respond in time on " + n_too_slow + " trials .\n</p>" +
            "<br>" +
            "<p style='font-size: 24px;'>Press SPACE to continue.</p>"
    },
    choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "instructions";
        pause = true;
    },
    on_finish: function() {
        pause = false;
        block = "end";
    }
};

/*Fragen Instruktion*/
var instruction_10= {
    type: "html-keyboard-response",
    stimulus: "<div align=left> Great!<br> " +
    "You are almost done, thank you for your efforts! <br>"+
    "Some final questions regarding your participation will follow now.<br>"+
    "Please answer those questions spontaneously and honestly.<br><br>"+
    "Do not close the window yet! <br>"+
    "Please finish the whole experiment (including the following questions). <br>" +
    "Terminating the experiment prematurely would render us unable to grant you your credit.<br><br>"+
    "Press SPACE to start.</div>",
    choices: [KEYS.CONTINUE],
    on_load: function() {
        exp_part_current = "instructions";
        pause = true;
    },
    on_finish: function() {
        pause = false;
        block = "end";
    }
};



/*Forget Debriefing*/

var debriefing= {
        type: "html-keyboard-response",
        stimulus: "<div align=left> " +          
        "Finally, we would like to give you some background information about this study. <br>" +
        "<strong>Do not close this window yet</strong>. Please continue to the final page where you will <br>" +
        "find a <strong> redirect button</strong> to click on to appropriately end the experiment when " +
        "you are asked to. <br><br> " +

        "Even though we did not test your memory of the pictures you were asked to forget " +
        "(<span style='color: darkorange; font-size:28px'>Ø</span>) directly, <br> " +
        "this study was still about how well humans can forget information.<br>" +

        "We are especially interested in the question wether " +
        "<span style='color: darkorange; font-size:28px'>Ø</span> pictures leave fewer traces in our memory<br>" +
        "as compared to <span style='color: dodgerblue; font-size: 28px'>O</span> " +
        "pictures. <br> " +
        "Based on previous studies, we assume that throughout the study, people respond <br>" +
        "faster and faster to <span style='color: dodgerblue; font-size: 28px'>O</span> pictures. <br>" +
        "We expect that this will not be the case for <span style='color: darkorange; font-size:28px'>Ø</span> pictures. <br>"+

        "To investigate this, it was important that you truly tried to remember the <span style='color: dodgerblue; font-size: 28px'>O</span> pictures and" +
        " to tell you that there would be a later memory test on these pictures.<br><br>"+
        "For the success of this study, it is, of course, crucial, that all participants try to forget the <span style='color: darkorange; font-size:28px'>Ø</span> pictures. <br>" +
        "Therefore, please do not tell anyone that we do not test these pictures at the end of the experiment,<br>"+
        "so that we can research the process of authentic forgetting.<br> Thank you for your assistance. <br><br>" +
        "In order to interpret our results correctly, it is also crucial for us to know whether you <br>" +
        "suspected that the pictures you were asked to forget might be tested afterwards. <br><br>" +
        "We will now ask you some more questions about this. <br> " +
        "It is important that you answer honestly, so that we can interpret our data correctly!<br><br>" +
        "<strong>Press SPACE to CONTINUE</strong> </div>",
        choices: [KEYS.CONTINUE],
        on_load: function() {
            pause = true;
            exp_part_current = "instructions";
        },
        on_finish: function() {
            pause = false;
        }
    };


/*##################Finale Frage Platzhaler 3#####################*/
/*######################Wird noch implementiert###################*/
/*################################################################*/

/*Ende*/
var instr_end = {
    type: "html-button-response",
    stimulus: "<div align=left> Well done - Thank you for your participation! <br><br>"+
    "Please click on 'Exit study and grant credit', so we can credit your participation.<br>"+
    "The study will end automatically.<br><br>"+
    "Thank you for your help with our research. We appreciate your participation!<br><br><br><br>",
    
        choices: ['Exit study and grant credit'],
        data: {exp_part: "instr"},
        on_load: function() {
            exp_part_current = "instructions";
            pause = true;
        },
};

console.log("instructions imported successfully.")

/*
Authors: 
Hannah Dames <damesh@cs.uni-freiburg.de>, 
Sara Feickert

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, July 2020
*/