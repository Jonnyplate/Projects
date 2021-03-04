/* #####################################################################
        defining the different trials and block components
##################################################################### */

var practice_procedure_1 = {
  type: 'rule-violation',
  words: 'test',
  blockade: jsPsych.timelineVariable('blockade'),
  data: jsPsych.timelineVariable('data'),
  time_Bonus: jsPsych.timelineVariable('time_Bonus'),
  Symbol: jsPsych.timelineVariable('Symbol'),
  Target_pos: jsPsych.timelineVariable('Target_pos'),
  BlposX : jsPsych.timelineVariable('BlposX'), // Blockadeposition (rechts vs links)
  PointRTLimit: function() {
    if ((Math.floor(Math.random() * 100) < 30) ){
      return 0
    } else {
      return 10000000
    }
  }
,
  police:false,
  on_start: function() {
    TrialNumber = TrialNumber+1;
    TrialNumberBlock = TrialNumberBlock +1;
  },
  on_finish: function(trial_data) {
    trial_data.Practice = 1;
    trial_data.TrialNumber = TrialNumber;
    trial_data.TrialNumberBlock = TrialNumberBlock;
  }
  }

  var practice_procedure_2 = {
  type: 'rule-violation',
  words: 'test',
  blockade: jsPsych.timelineVariable('blockade'),
  data: jsPsych.timelineVariable('data'),
  time_Bonus: jsPsych.timelineVariable('time_Bonus'),
  Symbol: jsPsych.timelineVariable('Symbol'),
  Target_pos: jsPsych.timelineVariable('Target_pos'),
  BlposX : jsPsych.timelineVariable('BlposX'), // Blockadeposition (rechts vs links)
  PointRTLimit: function() {
    if ((Math.floor(Math.random() * 100) < 30) ){
      return 0
    } else {
      return 10000000
    }
  },
  on_start: function(trial) {
    if (trespasses == 1) { trial.police = true}
    else {trial.police= (Math.floor(Math.random() * 100) < 15)};
    TrialNumber = TrialNumber+1;
    TrialNumberBlock = TrialNumberBlock +1;
  },
  on_finish: function(trial_data) {
  trial_data.RuleBreakRisk = "15%";
  trial_data.Practice = 2;
  trial_data.TrialNumber = TrialNumber;
  trial_data.TrialNumberBlock = TrialNumberBlock;
  if (trial_data.RuleBreak) {trespasses = trespasses + 1 }
  if (trial_data.ResponseCorrect == true && trial_data.ConformityCritical == false) {
    correct_uncritical_trials = correct_uncritical_trials + 1;        // number of trials with correct response and no block to RuleBreak
    TT_cum = TT_cum+trial_data.TotalTime;                                    // cumulated total time (IT+MT) of all correct uncritical trials
  }
  } 
  }

  var main_trial_procedure = {
  type: 'rule-violation',
  words: 'test',
  blockade: jsPsych.timelineVariable('blockade'),
  data: jsPsych.timelineVariable('data'),
  time_Bonus: jsPsych.timelineVariable('time_Bonus'),
  Symbol: jsPsych.timelineVariable('Symbol'),
  Target_pos: jsPsych.timelineVariable('Target_pos'),
  BlposX : jsPsych.timelineVariable('BlposX'), // Blockadeposition (rechts vs links)
  PointRTLimit: function() {
    if(correct_uncritical_trials==0) { 
      return 700                                   // in the unlikely event that participants have no correct unctitical trials, min Bonustime is set to 700   
    } else {
      return TT_cum/correct_uncritical_trials  // min Bonustime depending on mean response Time in correct uncritical trials of practice
    }                                       
  },
  police: function() {
      return (Math.floor(Math.random() * 100) < 15) 
  },
  on_start: function() {
    TrialNumber = TrialNumber+1;
    TrialNumberBlock = TrialNumberBlock +1;
  },
  on_finish: function(data) {
    data.PointSum = data.TrialPoints+jsPsych.data.get().filter({exp_part: 'main'}).select('TrialPoints').sum();
    data.Practice = 0;
    data.RuleBreakRisk = "15%";
    data.TrialNumber = TrialNumber;
    data.TrialNumberBlock = TrialNumberBlock;
  }
  }

var break_feedback = {
  type: "html-keyboard-response",
  stimulus: function() {
    var points_cum = jsPsych.data.get().filter({exp_part: 'main'}).select('TrialPoints').sum();
    return "<b>PAUSE</b>" +
            "<br><br><b>Block " + BlockNumber + "/" + tot_blocks + " geschafft! </b>" + 
            "<br><br>" +
            "Sie haben bisher insgesamt <b>" + points_cum + " Punkte </b>erzielt. " +
            "Sie können jetzt eine Pause einlegen." +
            "<br><br>" +
            "WEITER mit " + KEYS.CONTINUE 
  },
  on_load: function() {
      pause = true;
      exp_part_current = "break";
  },
  on_start: function() {
    TrialNumberBlock=0;   //set back TrialNumberBlock, but not TrialNumber!
  },
  on_finish: function() {
      pause = false;
      BlockNumber += 1;
      points_cum = jsPsych.data.get().filter({exp_part: 'main'}).select('TrialPoints').sum();
      console.log("starting block number " + BlockNumber)
  }
}
  
  var practice_1 = {
    timeline: [practice_procedure_1],
    timeline_variables: test_stimuli,
    sample: {
      type: 'without-replacement',
      size: 10
  },
  on_load: function() {
    exp_part_current = "practice";
  },
  }

  var practice_2 = {
    timeline: [practice_procedure_2],
    timeline_variables: test_stimuli,
    sample: {
      type: 'without-replacement',
      size: 32
  },
  on_load: function() {
    exp_part_current = "practice2";
  },
  }

  var main_experiment_trials = {
    timeline: [main_trial_procedure],
    timeline_variables: test_stimuli,
    randomize_order: true,
    on_load: function() {
      exp_part_current = "main"; 
    },
  }

  var main_experiment = {
    timeline: [main_experiment_trials, break_feedback], 
    repetitions: tot_blocks,
  }

console.log("trials imported successfully.")

/*
Credit: Jonas Plate & Salomé Li Keintzel
*/