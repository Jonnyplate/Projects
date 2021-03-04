/*
This file contains all survey and demographic questions.
*/

/* ############################################################################
            Demographic Questions
############################################################################ */


var scale_gender = [
    "male",
    "female",
    "diverse"
];

var scale_school = ["no degree",
    "elementary school",
    "middle school/secondary school/ graduation from polytechnic high school",
    "high school",
    "others"
]

var scale_education = ["No school-leaving qualifications",
"Less than high school diploma",
"High school graduate, diploma or equivalent",
"Completed university degree or equivalent",
"Doctorate degree",
"Still in training/ university",
"other"
]

var question_age = {
    type: "survey-text",
    questions: [
        {prompt: "<div>Next, we will ask you some questions regarding demographics.</div>" +
            "<br>" + "<br>" + "<br>" +
            "How old are you?",
            rows: 1, columns: 20,
            name: "age",
            required: true
        }
    ],
    button_label: "Continue"
}

var question_demographic_choice = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "<strong>Gender:</strong> ",
            options: scale_gender,
            name: "gender",
            required: true},
        {prompt: "<strong>What is your (highest) educational level?</strong>",
            options: scale_school,
            name: "school",
            required: true},
        {prompt: "<strong>What is your (highest) professional level?</strong>",
            options: scale_education,
            name: "education",
            required: true},
    ],
    button_label: "Continue",
    on_finish: function(data) {
        // console.log(data.responses.includes('noch in Ausbildung oder Student/in (noch kein Abschluss)');
        if(data.responses.includes('training')) {
            education_text = true;
        } else {
            education_text = false;
        }  
    }
};


var question_demographic_text = {
    type: "survey-text",
    questions: [
        {prompt: "<div> You stated that you are still in training or university. </div>" +
            "<div> What training are you in or what program are you currently enrolled in?</div>",
        rows: 10, columns: 80,
        name: "education_text",
            required: true},
    ],
    button_label: "Continue",
}


var conditional_education = {
    timeline: [question_demographic_text],
    conditional_function:   function() {
        return education_text //skip if not selected
    }
}


/* ############################################################################
            Survey at the end
############################################################################ */


var scale_difficult = [
    "very easy",
    "rather easy",
    "neutral",
    "rather difficult",
    "very difficult"
];
var scale_demanding = [
    "not at all demanding",
    "rather not demanding",
    "neutral",
    "rather demanding",
    "very demanding"
];

var scale_attentive = [
    "not at all attentive",
    "rather not attentive",
    "neutral",
    "rather attentive",
    "very attentive"
];

var question_motivation = {
    type: 'survey-likert',
    questions: [
        {prompt: "How easy/difficult was this task for you?",
            labels: scale_difficult,
            name: "difficult",
            required: true},
        {prompt: "How demanding was this task for you?",
            labels: scale_demanding,
            name: "demanding",
            required: true},
        {prompt: "How attentive were you during the course of this task?",
            labels: scale_attentive,
            name: "attentive",
            required: true},
    ],
    name: "motivation_questions",
    button_label: "Continue",
    on_start: function() {
        exp_part_current = "survey";
    }
};

var question_open = {
    type: 'survey-text',
    questions: [
        {prompt: "<div>Did you notice any particularities during the course of the " +
        "experiment?  </div> " +
                "<div>If so, please describe it below. </div> ",
            rows: 10, columns: 80,
        name: "noticed"},
        {prompt: "<div> Do you have any suspicion about the purpose of the " +
        "experiment?  </div> " +
                "<div> If so, please describe it below. </div>",
            rows: 10, columns: 80,
        name: "presumption"}
    ],
    name: "open_questions",
    button_label: "Continue",
    on_start: function() {
        exp_part_current = "survey";
    }
};

var scale_cues = [
    "<span style='color: dodgerblue; font-size: 28px'>O</span>",
    "<span style='color: darkorange; font-size:28px'>Ø</span>"
];

var question_cue_choice = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "In the first part of the experiment various symbols appeared after the objects. <br>"+
        "One of these symbols indicated that you should remember the objects shown before. <br>"+
        "Please select the symbol that indicated that you should remember the object shown before.<br>",
            options: scale_cues,
            name: "question_cue_choice",
            required: true},
    ],
    button_label: "Continue"
};

var question_cue_open = {
    type: 'survey-text',
    questions: [
        {prompt: "Please describe briefly what you did after the <span style='color: darkorange; font-size:28px'>Ø</span>- symbol appeared.",
            rows: 10, columns: 80,
        name: "forget_cue_text"},
        {prompt: "Please describe briefly what you did after the <span style='color: dodgerblue; font-size: 28px'>O</span>- symbol appeared.",
            rows: 10, columns: 80,
        name: "remember_cue_text"},
    ],
    name: question_suspicion_open,
    button_label: "Continue",
    on_start: function() {
        exp_part_current = "survey";
    }
}

var scale_suspicion = [
    "not suspicious at all", 
    "rather unsuspicious",
    "neutral",
    "rather suspicious",
    "very suspicious"
];

var scale_forget = [
    "did not try to memorize them at all",
    "rather did not try to memorize them",
    "neutral",
    "rather did try to memorize them",
    "tried very hard to memorize them"
];

var question_suspicion = {
    type: 'survey-likert',
    questions: [
        {prompt: "When learning the pictures, did you suspect that you would be later asked to " + 
        "recognize the <span style='color: darkorange; font-size:28px'>Ø</span>-pictures you were told to forget "+
        "(regardless of the fact that there was no memory test in the end)?",
            labels: scale_suspicion,
            name: "suspicion_likert",
            required: true},
        {prompt: "How hard did you try to memorize the to be forgotten pictures after you saw the <span style='color: darkorange; font-size:28px'>Ø</span>-instruction even though you were not supposed to?",
            labels: scale_forget,
            name: "trying_forget",
            required: true}
    ],
    name: "motivation_questions",
    button_label: "Continue",
    on_start: function() {
        exp_part_current = "survey";
    }
};


var question_suspicion_open = {
    type: 'survey-text',
    questions: [
        {prompt: "If you thought you had to recognize the to-be-forgotten pictures one more time, please describe your suspicion below.",
            rows: 10, columns: 80,
        name: "suspicion_text"},
        {prompt: "Do you have any comments?",
            rows: 10, columns: 80,
        name: "comments"},
    ],
    name: "question_suspicion_open",
    button_label: "Continue",
    on_start: function() {
        exp_part_current = "survey";
    }
}

var scale_yesno = [
    "yes",
    "no"
];

var question_disturbed = {
    type: 'survey-multi-choice',
    questions: [{
        prompt: "Were you able to carry out the experiment undisturbed and without interruptions?<br>",
        options: scale_yesno,
        name: "post_disturbed",
        required: true
      }
    ],
    button_label: "Continue",
    on_start: function() {
        exp_part_current = "survey";
        $('body').css('cursor', 'default');
    }
  };

  
  var scale_serious = [
    "Yes, I took the experiment seriously. My data can be used for analysis.",
    "No, I just wanted to 'have a look', participated a second time or do not want my data to be used for analysis."
]

var question_serious_participation = {
    type: 'survey-likert',
    questions: [
        {prompt: "<strong>Can we use your data for analysis?</strong><br><br>" +
        "Note: Please answer this question honestly.<br>"+
        "<strong>Regardless of the response to this question, you will receive credit when you fully participated in the study (even in case you press 'no').</strong><br>"+
        "We ask for your honesty in order to include only meaningful data into our analyses.<br><br>",
              
            labels: scale_serious,
            name: "serious_selection",
            required: true}
    ],
    scale_width: 400,
    name: "question_serious_participation",
    button_label: "Continue",
    on_start: function() {
        exp_part_current = "survey";
    }
}


console.log("survey questions imported successfully");

/*
Authors: 
Hannah Dames <damesh@cs.uni-freiburg.de>, 
Sara Feickert 

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, July 2020
*/
