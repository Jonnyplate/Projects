
var practice_procedure_1 = {
  type: 'rule-violation',
  words: 'test',
  blockade: jsPsych.timelineVariable('blockade'),
  data: jsPsych.timelineVariable('data'),
  time_Bonus: jsPsych.timelineVariable('time_Bonus'),
  Symbol: jsPsych.timelineVariable('Symbol'),
  Aim_pos: jsPsych.timelineVariable('Aim_pos'),
  BlposX : jsPsych.timelineVariable('BlposX'), // Blockadeposition (rechts vs links)
  min_BonusTime: 1000,
  police:false
  }

  var practice_procedure_2 = {
  type: 'rule-violation',
  words: 'test',
  blockade: jsPsych.timelineVariable('blockade'),
  data: jsPsych.timelineVariable('data'),
  time_Bonus: jsPsych.timelineVariable('time_Bonus'),
  Symbol: jsPsych.timelineVariable('Symbol'),
  Aim_pos: jsPsych.timelineVariable('Aim_pos'),
  BlposX : jsPsych.timelineVariable('BlposX'), // Blockadeposition (rechts vs links)
  min_BonusTime: 1000,
  on_start: function(trial) {
    if (trespasses == 1) { trial.police = true}
    else {trial.police= (Math.floor(Math.random() * 100) < 15)}
  },
  on_finish: function(trial_data) {
  if (trial_data.trespass) {trespasses = trespasses + 1 }
  if (trial_data.correct_reaction) {
    correct_trials = correct_trials + 1;
    MT_mean = trial_data.MT + trial_data.IT
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
  Aim_pos: jsPsych.timelineVariable('Aim_pos'),
  BlposX : jsPsych.timelineVariable('BlposX'), // Blockadeposition (rechts vs links)
  min_BonusTime: MT_mean/correct_trials,
  police: function() {
      return (Math.floor(Math.random() * 100) < 15) 
  }
  }
  
  var practice_1 = {
    timeline: [practice_procedure_1],
    timeline_variables: test_stimuli,
    sample: {
      type: 'without-replacement',
      size: 10
  }
  }

  var practice_2 = {
    timeline: [practice_procedure_2],
    timeline_variables: test_stimuli,
    sample: {
      type: 'without-replacement',
      size: 32
  }
  }

  var main_experiment = {
    timeline: [main_trial_procedure],
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 12
  }

console.log("trials imported successfully.")