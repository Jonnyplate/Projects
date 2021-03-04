/* #####################################################################
        This file contains the survey elements used
##################################################################### */

/* #################### device question #################### */

var scale_devices = [
    "Smartphone",
    "Tablet",
    "Laptop mit Touchpad",
    "Laptop mit Maus",
    "Desktop-PC mit Maus"
]

var question_device = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "<div align= left>Von welchem Endgerät aus nehmen Sie gerade an dieser Studie teil?<br>",
        name: "DeviceUsed",
        options: scale_devices,
        button_label: "Weiter",
        required: true
        },
    ],
    on_load: function() {
        pause = true;
        exp_part_current = "survey";
    },
    on_finish: function(data){
        pause = false;
        if(data.responses.includes("mit Maus")){
            CORRECTDEVICE = true;
        } else {
            CORRECTDEVICE = false;
            jsPsych.endExperiment("Du hast angegeben, dass du nicht von einem Endgerät mit Maus teilnimmst. <br>" +
            "Da dies für die Teilnahme an dieser Studie zwingend notwendig ist, endet das Experiment hier. <br>" +
            "Bitte nimm von einem Laptop oder Desktop-PC mit Maus teil. ");
        }
    }
};

/* #################### demographics #################### */

var scale_gender = [
    "männlich",
    "weiblich",
    "divers"
];

var scale_handiness = [
    "rechts",
    "links",
    "beidhändig"
]

var scale_school = ["kein Schulabschluss",
    "Haupt-/Volksschulabschluss",
    "Mittlere Reife/Realschule/Abschluss der Polytechnischen Oberschule",
    "Fachhochschulreife",
    "Abitur",
    "Sonstiges"
]

var scale_education = ["keine Berufsausbildung",
    "noch in Ausbildung oder Student*in (noch kein Abschluss)",
    "abgeschlossene Lehre oder Meisterbrief",
    "Berufsakademie-, Fachhochschul- oder Universitätsabschluss",
    "Promotion oder höher",
    "sonstiger beruflicher Ausbildungsstand"
]

var question_age = {
    type: "survey-text",
    questions: [
        {prompt: "<div>Im Folgenden bitten wir Sie um einige persönliche Angaben.</div>" +
            "<br>" + "<br>" + "<br>" +
            "Wie alt sind Sie?",
            rows: 1, columns: 20,
            name: "Age",
            required: true
        }
    ],
    button_label: "Weiter"
}

var question_handiness = {
    type: "survey-multi-choice",
    questions: [
        {prompt: "Sind Sie Rechts-, Links-, oder Beidhänder*in?",
        options: scale_handiness,
        name: "Handedness",
        required: true
        }
    ]
}

var question_demographic_choice = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "<strong>Geschlecht:</strong> ",
            options: scale_gender,
            name: "Gender",
            required: true},
        {prompt: "<strong>Was ist der höchste Schulabschluss, den Sie besitzen?</strong>",
            options: scale_school,
            name: "SchoolLevel",
            required: true},
        {prompt: "<strong>Was ist Ihr höchster, beruflicher Ausbildungsstand?</strong>",
            options: scale_education,
            name: "EducationLevel",
            required: true},
    ],
    button_label: "Weiter",
    on_finish: function(data) {
        // console.log(data.responses.includes('noch in Ausbildung oder Student*in (noch kein Abschluss)'));
        if(data.responses.includes('noch in Ausbildung oder Student*in (noch kein Abschluss)')) {
            education_text = true;
        } else {
            education_text = false;
        }  
    }
};


var question_demographic_text = {
    type: "survey-text",
    questions: [
        {prompt: "<div> Sie haben angegeben, dass Sie sich noch in der Ausbildung befinden oder " +
            "Student*in sind. </div>" +
            "<div> Welche Ausbildung absolvieren Sie aktuell bzw. welches " +
            "Studienfach studieren Sie?</div>",
        rows: 10, columns: 80,
        name: "Education_text",
            required: true},
    ],
    button_label: "Weiter",
}


var conditional_education = {
    timeline: [question_demographic_text],
    conditional_function:   function() {
        return education_text //skip if not selected
    }
}

//demographics block
var demographics = {
    timeline: [
        question_age,
        question_handiness,
        question_demographic_choice,
        conditional_education
    ],
    on_load: function() {
        exp_part_current = "survey";
        pause = true;
    },
    on_finish: function() {
        pause = false;
    },
}

/* #################### Strategy questions #################### */

var question_strategy = {
    type: "survey-text",
    questions: [
        {prompt: "Haben Sie irgendeine Strategie angewandt, um die Aufgabe besonders gut zu lösen? <br>" +
            "Wenn ja, beschreiben Sie diese kurz.<br>",
            rows: 4, columns: 30,
            name: "Strategy",
        }
    ],
    button_label: "Weiter",
}

/* #################### Corona and rule breaking questions #################### */

var scale_likert_7 = [
    "1<br>stimme überhaupt nicht zu",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7<br>stimme voll und ganz zu"
]

var questions_corona = {
    type: 'survey-likert',
    preamble: "<br><b>Im Folgenden beziehen wir uns auf die folgenden drei Regeln: </b><br><br>" +
    "<img src='"+ AHA_pic +"'></img> <br>" +
    "Bitte bewerten Sie die folgenden Aussagen <br> "+
    "auf einer Skala von 1 <b>“stimme überhaupt nicht zu”</b> bis 7 <b>“stimme voll und ganz zu”</b>. <br><br> ",
    questions: [
        {prompt: "<b>Ich betrachte die oben genannten Corona-Schutzmaßnahmen (AHA-Regeln) als sinnvoll.</b>",
            labels: scale_likert_7,
            name: "CoronaRuleConformity_1",
            horizontal: true,
            required: true},
        {prompt: "<b>Es gelingt mir immer, mich an die oben genannten Corona-Schutzmaßnahmen (AHA-Regeln) zu halten.</b>",
            labels: scale_likert_7,
            name: "CoronaRuleConformity_2",
            horizontal: true,
            required: true},
        {prompt: "<b>Ich halte die oben genannten Corona-Schutzmaßnahmen (AHA-Regeln) für notwendig.</b>",
            labels: scale_likert_7,
            name: "CoronaRuleConformity_3",
            horizontal: true,
            required: true},
        {prompt: "<b>Corona stellt für Personen in meinem Umfeld eine gesundheitliche Bedrohung dar.</b>",
            labels: scale_likert_7,
            name: "CoronaRuleConformity_4",
            horizontal: true,
            required: true},
        {prompt: "<b>Corona stellt für mich eine gesundheitliche Bedrohung dar.</b>",
            labels: scale_likert_7,
            name: "CoronaRuleConformity_5",
            horizontal: true,
            required: true},
        {prompt: "<b>Ich fühle mich in meinem Alltag durch die Corona-Pandemie eingeschränkt.</b>",
            labels: scale_likert_7,
            name: "CoronaImpact_1",
            horizontal: true,
            required: true},
        {prompt: "<b>Ich fühle mich durch die Corona-Pandemie unter Druck gesetzt/gestresst.</b>",
            labels: scale_likert_7,
            name: "CoronaImpact_2",
            horizontal: true,
            required: true},
        {prompt: "<b>Ich fühle mich durch die Corona-Pandemie ängstlich und unsicher.</b>",
            labels: scale_likert_7,
            name: "CoronaImpact_3",
            horizontal: true,
            required: true},
        {prompt: "<b>Ich fühle mich durch die Corona-Pandemie einsam und sozial isoliert.</b>",
            labels: scale_likert_7,
            name: "CoronaImpact_4",
            horizontal: true,
            required: true},
        {prompt: "<b>Ich empfinde die Veränderung meiner finanziell-wirtschaftlichen Situation durch die Corona-Pandemie als belastend.</b>",
            labels: scale_likert_7,
            name: "CoronaImpact_5",
            horizontal: true,
            required: true},
    ],
    on_load: function() {
        exp_part_current = "survey";
        pause = true;
    },
    on_finish: function() {
        pause = false;
    },
    button_label: "Weiter",
}

scale_likert_7_2 = [
    "1<br>völlige Ablehnung",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7<br>völlige Zustimmung"
]

var questions_rulebreaking = {
    type: 'survey-likert',
    preamble: "<br>Geben Sie bitte für jede der folgenden Aussage an, wie sehr Sie ihr zustimmen. <br> " +
    "Nutzen Sie dafür die Skala von 1 <b>„völlige Ablehnung“</b> bis 7 <b>„völlige Zustimmung“</b>. ",
    questions: [
        {prompt: "<b>Manchmal lüge ich, wenn ich muss.</b>",
            labels: scale_likert_7_2,
            name: "BIDR_RuleConformity_1",
            horizontal: true,
            required: true},
        {prompt: "<b>Ich habe schon einmal zu viel Wechselgeld herausbekommen, ohne es der/dem Verkäufer*in zu sagen.</b>",
            labels: scale_likert_7_2,
            name: "BIDR_RuleConformity_2",
            horizontal: true,
            required: true},
        {prompt: "<b>Manchmal halte ich mich nicht an die Verkehrsregeln.</b>",
            labels: scale_likert_7_2,
            name: "BIDR_RuleConformity_3",
            horizontal: true,
            required: true},
        {prompt: "<b>Ich nehme niemals Dinge an mich, die mir nicht gehören.</b>",
            labels: scale_likert_7_2,
            name: "BIDR_RuleConformity_4",
            horizontal: true,
            required: true},
        {prompt: "<b>Ich bin schon einmal wegen einer angeblichen Krankheit nicht zur Arbeit oder Schule gegangen.</b>",
            labels: scale_likert_7_2,
            name: "BIDR_RuleConformity_5",
            horizontal: true,
            required: true},
    ],
    button_label: "Weiter",
    on_load: function() {
        exp_part_current = "survey";
        pause = true;
    },
    on_finish: function(data) {
        pause = false;
        //data.
    },
}

/* #################### problem question #################### */

var question_strategy = {
    type: "survey-text",
    questions: [
        {prompt: "Traten bei Ihnen während der Bearbeitung der Aufgabe oder zu irgendeinem Zeitpunkt im Experiment Probleme auf? <br>" +
            "Wenn ja, beschreiben Sie diese bitte kurz.<br>",
            rows: 4, columns: 30,
            name: "Problems",
        }
    ],
    button_label: "Weiter",
}

/* #################### email-question #################### 

var question_email = {
    type: "survey-text",
    questions: [
        {prompt: "<b>Geschafft!</b><br><br>" +
        "Wenn Sie bei der Vergabe des 30€-Gutscheins (Amazon) berücksichtigt werden wollen, tragen Sie bitte im Folgenden Ihre <br>" +
        "E-Mailadresse ein, damit wir Ihnen den Gutschein zulassen kommen können, falls Sie gewinnen. <br><br>" +
        "Ihre Gesamtpunktzahl und E-Mailadresse werden separat gespeichert, so dass keine Zuordnung zu Ihren Angaben im Rahmen des <br>" +
        "Experiments möglich ist. Das heißt, Ihre Daten bleiben anonym und wir können Ihre Angaben im Rahmen des Experiments nicht <br>" +
        "mit Ihrer Person in Verbindung bringen, auch wenn Sie Ihre E-Mailadresse angeben." +
        "Wenn Sie auf weiter klicken erhalten Sie Informationen zum Zweck dieser Studie. <br><br>" +
        "<b>E-Mailadresse:</b>",
        rows: 1, columns: 20,
        name: "Email"
        }
    ],
    button_label: "Weiter",
    on_load: function() {
        exp_part_current = "Email_question";
        pause = true;
    },
    on_finish: function(data) {
        pause = false;
        data.points_cum = points_cum+22;
    }
}*/

console.log("survey imported successfully.")

/*
Credit: Salomé Li Keintzel, 
        Hannah Dames, Sara Feickert
*/