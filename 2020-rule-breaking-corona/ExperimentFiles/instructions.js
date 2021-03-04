/* #####################################################################
        This file contains the instructions used
##################################################################### */

var welcome_1 = {
    type: "html-keyboard-response",
    stimulus: "<div align=left><b>Vielen Dank, dass Sie an unserem Experiment teilnehmen möchten!</b> <br><br>" +
    "Im Rahmen dieses Projektes an der Albert-Ludwigs-Universität Freiburg untersuchen wir wie Menschen ihre Handlungen steuern. <br> " +
    "Dabei wird es Ihre Aufgabe sein, in verschiedenen Situationen so schnell und korrekt wie möglich mit der Maus zu reagieren. <br> " +
    "Durch korrektes und schnelles Reagieren sammeln sie Punkte. <br><br>" + 
    "Wichtig ist, dass Sie sich an einem PC oder Laptop befinden und <b>eine Maus zur Verfügung haben</b>. Eine Teilnahme vom Smartphone <br>" +
    "oder Tablet aus oder mittels Laptop-Touchpad ist leider nicht möglich! Falls Sie gerade nicht von einem PC/Laptop mit Maus <br> " +
    "teilnehmen, beenden Sie den Versuch bitte jetzt und starten Sie ihn von einem geeigneten Gerät aus neu. <br><br>" +
    "Das Experiment wird insgesamt etwa <b>35-45 Minuten</b> in Anspruch nehmen. Bitte stellen Sie sicher, dass Sie während dieser Zeit <b>ungestört</b> <br>" +
    "die Aufgabe bearbeiten können! Psychologiestudierende der Universität Freiburg erhalten für die Teilnahme <b>0,75 VP-Stunden</b>. Darüber <br>" +
    "hinaus haben alle Teilnehmer*innen die <b>Chance auf einen 30€-Gutschein (Amazon)</b>. Dieser wird nach Abschluss der Studie an die <br>" +
    "Person, die die meisten Punkte gesammelt hat, vergeben.<br><br>" +
    "<b>Wichtig: </b>Verlassen Sie dieses Browser-Fenster ausschließlich in den mit “PAUSE” gekennzeichneten Abschnitten des <br>" +
    "Experiments und schließen Sie das Browser-Fenster nach Beendigung der Studie erst, wenn Sie dazu aufgefordert werden.<br> "+
    "Klicken Sie hierzu auf den entsprechenden Button am Ende der Studie.<br>"+
    "Falls Sie das Browser-Fenster dieser Studie außerhalb der Pausen verlassen oder vorzeitig schließen, können wir Ihre Teilnahme <br>" +
    "nicht verbuchen. <br><br> " +
    "Drücken Sie " + KEYS.CONTINUE + " um zu beginnen. <br> ",
    choices: [KEYS.CONTINUE],
    on_load: function() {
        pause = true;
        exp_part_current = "instruction";
    },
    on_finish: function() {
        pause = false;
        console.log(urlvar.participant); // logs participant ID
    },
};

var informed_consent = {
    type: "html-button-response",
    stimulus: "<div align=left><strong> Informierte Einwilligung</strong>  <br>" +
        "Ziel unserer Forschung ist es, menschliches Verhalten und mentale Prozesse besser zu verstehen. <br>" +
        "In der folgenden Untersuchung wird dazu Ihr Verhalten (z.B. Wahlverhalten, Reaktionszeiten) aufgezeichnet. <br> <br>" +
        "<strong> Freiwilligkeit und Anonymität </strong> <br>" +
        "Die Teilnahme an der Studie ist <strong>freiwillig</strong>.<br>" +
        "Sie können jederzeit und ohne Angabe von Gründen Ihre Einwilligung zur Teilnahme an dieser  Studie widerrufen. <br><br> " +
        "Da keine personenbezogenen Daten erhoben werden, ist nach Abschluss der Datenerhebung prinzipiell <br> <strong>keine Zuordnung mehr zwischen den " +
        "Daten im Datensatz und Ihrer Person</strong> möglich – der Datensatz ist anonym. <br>"+
        "Entsprechend ist nach Abschluss dieser Datenerhebung auch keine gezielte Löschung Ihres persönlichen <br>" +
        "Datensatzes möglich, da wir diesen nicht zuordnen können.<br>"+
        "Die Ergebnisse und Daten der Studie können als wissenschaftliche Publikation veröffentlicht werden. Dies geschieht <br>" +
        "in <strong>anonymisierter Form</strong>, d. h. ohne dass die Daten einer spezifischen Person zugeordnet werden können.<br>" +
        "Die vollständigen Daten dieser Studie können zur Gewährleistung von " +
        "Transparenz in der Wissenschaft als offene <br>Daten im Internet " +
        "in einem Datenarchiv und/oder anderen Forschenden zugänglich gemacht werden. <br> Damit folgt diese Studie " +
        "den Empfehlungen der Deutschen Forschungsgemeinschaft (DFG) und der " +
        "Deutschen <br>Gesellschaft für Psychologie (DGPs) zur Qualitätssicherung in der Forschung. <br><br> " +

        "Wenn Sie jetzt oder nach dem Versuch Fragen haben, wenden Sie sich bitte " +
        "an Christina Pfeuffer <br>(christina.pfeuffer@psychologie.uni-freiburg.de).<br><br>" +

        "Hiermit versichere ich, dass ich die oben beschriebenen Teilnahmeinformationen verstanden habe <br>"+
        "und mit den genannten Teilnahmebedingungen einverstanden bin.<br><br> </div>",
        choices: ['Ich bin einverstanden', 'Ich bin <strong>nicht</strong> einverstanden'],
        on_load: function() {
            pause = true;
            exp_part_current = "instruction";
        },
        on_finish: function(data){
            pause = false;
            if(data.button_pressed == 1){
                consent = false;
                data.InformedConsent = 0;
                jsPsych.endExperiment('Da Sie nicht mit den zuvor beschriebenen ' +
                    'Teilnahmebedingungen einverstanden sind,<br> endet die Studie nun.');
            } else {
                consent = true;
                data.InformedConsent = 1;
            }
        }   
};

var instruction_practice1 = {
    type: "html-keyboard-response",
    stimulus: "<b>Hinweise zur Aufgabe </b><br><br>" +
    "Ihre Aufgabe wird es nun sein, Ihre Maus jeweils so schnell wie möglich von einem Startfeld (unten mittig) aus zu <br> " +
    "einem von zwei Zielorten rechts und links oben auf dem Bildschirm zu bewegen. Vor jedem Durchgang wird Ihnen das Symbol <br>" +
    "des Zielorts angezeigt (<img src='"+ Symbol_1 +"' width='20' height='20'></img> oder <img src='"+ Symbol_2 +"' width='20' height='20'></img>) " +
    "zu dem Sie sich bewegen sollen. Sobald Sie danach mit der Maus auf das Startfeld <br>" +
    "(unten mittig) klicken, erscheint dieses Symbol zufällig entweder am rechten oder linken Zielort oben auf dem Bildschirm. <br><br>" + 
    "<b>Bewegen Sie die Maus so schnell wie möglich auf das Symbol und vermeiden Sie dabei Fehler! </b><br><br>" +
    "Gemeinsam mit dem Symbol, zu dem Sie sich im aktuellen Durchgang bewegen sollen, sehen Sie auch entweder die Zahl 1 oder 10. <br>" +
    "Das ist die Anzahl Punkte, die Sie in diesem Durchgang erhalten können. <br><br>" +
    "<b> Der/die Teilnehmer*in, der/die im Hauptexperiment die meisten Punkte sammelt, erhält den 30€-Gutschein (Amazon). </b><br><br>" +
    "Üben wir zunächst einmal die Aufgabe, ohne dass die Punkte von Bedeutung sind. <br>" +
    "Bewegen Sie die Maus so schnell wie möglich auf das richtige Symbol! Sie können dabei den gesamten Bildschirm ausnutzen. <br>" +
    "Die Umgebungsmerkmale die Ihnen angezeigt werden sind noch nicht von Bedeutung und können mit der Maus überfahren werden. <br><br>" +
    "Drücken Sie " + KEYS.CONTINUE + " um mit der Übung zu beginnen. ",
    choices: [KEYS.CONTINUE],
    on_load: function() {
        pause = true;
        exp_part_current = "instruction";
    },
    on_start: function() {
        TrialNumber=0;    //set back TrialNumber
        TrialNumberBlock=0;
    },
    on_finish: function() {
        pause = false;
    },
};

var instruction_practice2 = {
    type: "html-keyboard-response",
    stimulus: "<b>Super!</b> Nun noch zur Bedeutung der Umgebungsmerkmale, die Ihnen vermutlich bereits aufgefallen sind. <br><br>" +
    "Nach einer weiteren kurzen Übungsphase folgt gleich das Hauptexperiment, in dem Sie für richtiges und schnelles <br>" +
    "Ankommen am Zielort jeweils die Punkte erhalten, die Ihnen am Anfang jedes Durchgangs angezeigt werden (1 oder 10 Punkte). <br>" +
    "Der/die Teilnehmer*in, der/die im Hauptexperiment die meisten Punkte sammelt, erhält den 30€-Gutschein (Amazon). <br><br>" +
    "<b>Strengen Sie sich also an, so viele Punkte wie möglich zu sammeln! </b><br><br>" +
    "Die Situation für diese Studie ist die folgende: Sie befinden sich in der Innenstadt und müssen so schnell wie möglich <br>" +
    "an den richtigen Zielort gelangen. Leider haben Sie Ihre Maske zu Hause vergessen. Auf Ihrem Weg durch die Innenstadt <br>" +
    "gibt es einige Bereich, zu denen der <b>Zutritt untersagt</b> ist: <br><img src='"+ Blockade_N +"' width='60' height='40'></img> <br>" +
    "oder die <b>nur mit Maske</b> passiert werden dürfen: <br>" +
    "<img src='"+ Blockade_C +"' width='60' height='40'></img> <br> Wie im wirklichen Leben auch, können Sie diese " +
    "Bereiche selbstverständlich trotzdem passieren, um möglichst <br>" +
    "schnell ans Ziel zu kommen. <br><br>" +
    "Denken Sie daran, die Punkte des jeweiligen Durchgangs erhalten Sie nur, wenn Sie <b>schnell und richtig</b> reagieren. <br>" +
    "Wenn Sie mit der Maus die Bereiche, die Sie nicht betreten dürfen umfahren, gehen Sie kein Risiko ein. Sind Sie allerdings <br>" +
    "nicht schnell genug, erhalten Sie nicht die entsprechenden Punkte. Wenn Sie den direkten Weg wählen und mit der Maus durch <br>" +
    "die Bereiche, die Sie nicht betreten dürfen, fahren, besteht das Risiko, dass Sie von der Polizei, die ab und zu in der <br>" +
    "Innenstadt kontrolliert, erwischt werden. Dann müssen Sie eine Strafe von 20 Punkten zahlen. <br><br>" +
    "Im Folgenden sehen Sie, wie Ihnen die jeweils erhaltenen Punkte nach jedem Durchgang angezeigt werden können: <br>" +
    "<div class='row'>" +
    "<div class='column'>" +
        "<div class='container'><img src='"+ Police +"' width='120' height='100'><div class='centeredred'>-20!</div></div></div>" +
    "<div class='column'>" +
        "<div class='container'><img src='"+ Circle +"' width='100' height='100'><div class='centered'>+0!</div></div></div>" +
    "<div class='column'>" +
        "<div class='container'><img src='"+ Star +"' width='100' height='100'><div class='centered'>+1!</div></div></div>" +
    "<div class='column'>" +
        "<div class='container'><img src='"+ Star +"' width='100' height='100'><div class='centered'>+10!</div></div></div></div>" +
    "Sie haben nun nochmal einige Durchgänge Gelegenheit, die Aufgabe zu üben. <b>Hier zählen die Punkte noch nicht</b>. Das wird erst <br>" +
    "im Hauptexperiment der Fall sein. Probieren Sie also gern alles aus, um ein Gefühl für die Aufgabe zu bekommen. <br><br>" +
    "Drücken Sie " + KEYS.CONTINUE + " um mit der zweiten Übung zu beginnen.",
    choices: [KEYS.CONTINUE],
    on_load: function() {
        pause = true;
        exp_part_current = "instruction";
    },
    on_start: function() {
        TrialNumber=0;    //set back TrialNumber
        TrialNumberBlock=0;
    },
    on_finish: function() {
        pause = false;
    },
};

var instruction_main = {
    type: "html-keyboard-response",
    stimulus: "<div align=left><b>Super!</b> Nun startet das Hauptexperiment. <br><br> " +
    "Sie starten mit 0 Punkten. <b>Ab jetzt zählen alle Punkte, die Sie gewinnen oder verlieren. </b><br>" +
    "Nach einigen Durchgängen gibt es jeweils eine Pause, in der Ihnen der aktuelle Punktestand angezeigt wird. <br>" +
    "Denken Sie daran, Sie erhalten nur Punkte, wenn Sie sowohl <b>schnell als auch richtig</b> reagieren! <br><br>" +
    "Drücken Sie " + KEYS.CONTINUE + " um mit dem Experiment zu beginnen.",
    choices: [KEYS.CONTINUE],
    on_load: function() {
        pause = true;
        exp_part_current = "instruction";
    },
    on_start: function() {
        TrialNumber=0;    //set back TrialNumber
        TrialNumberBlock=0;
    },
    on_finish: function() {
        pause = false;
    },
}

var instruction_end_1 = {
    type: "html-keyboard-response",
    stimulus: function() {
    var points_cum = jsPsych.data.get().filter({exp_part: 'main'}).select('TrialPoints').sum();
    return "<b>Vielen Dank!</b> " +
        "Sie haben insgesamt " + points_cum + " Punkte erreicht." +
        "<br><br>" +
        "Bitte beantworten Sie nun noch kurz einige Fragen. <br><br>" +
        "Am Ende des Experiments haben Sie dann die Möglichkeit, Ihre E-Mailadresse anzugeben, so dass wir Sie kontaktieren und <br>" +
        "Ihnen den 30€-Gutschein (Amazon) schicken können, falls Sie die meisten Punkte erreicht haben. <br><br>" + 
        "Bitte antworten Sie <b>wahrheitsgemäß und spontan</b>. <br><br>" +
        "Alle Antworten werden <b>anonym</b> gespeichert. Ihre E-Mailadresse, die zur Vergabe des Gutscheins abgefragt wird, wird separat <br>" +
        "von Ihren Antworten in der Studie gespeichert. Ein Rückschluss auf Ihre Person ist nicht möglich. <br><br>" +
        "Drücken Sie " + KEYS.CONTINUE + " um fortzufahren."
    },
    choices: [KEYS.CONTINUE],
    on_load: function() {
        pause = true;
        exp_part_current = "instruction";
    },
    on_finish: function() {
        pause = false;
    },
}

var debriefing = {
    type: "html-button-response",
    stimulus: "<div align=left><b> Vielen Dank für Ihre Teilnahme an unserer Studie!  </b><br><br>" +
    "Diese Studie wurde im Rahmen eines Seminars von den Studierenden des Masterstudiengangs „Psychologie: Kognitionspsychologie, <br>" +
    "Lernen und Arbeiten“ entwickelt, um zu untersuchen, in wie weit die aktuellen Corona-Regeln bereits von Menschen verinnerlicht <br>" +
    "wurden. <br><br>" +
    "Es gibt bereits einige Untersuchungen, die sich mit Regelbruch-Verhalten im Bezug auf Alltagsregeln, mit denen wir lebenslange <br>" +
    "Erfahrung haben, beschäftigt haben. Dabei zeigte sich typischerweise, dass Personen unter anderem langsamer reagieren, wenn sie <br>" +
    "eine Regel brechen als wenn sie sich regelkonform verhalten. Außerdem tendieren Menschen dazu sich erst in Richtung des regelkonformen <br>" +
    "Verhaltens zu bewegen und dann auf den Regelbruch auszuweichen, was sich beispielsweise in der Bewegungsverläufen von Mausbewegungen <br>" +
    "zeigt.<br><br>" +
    "Hier wollen wir regelkonformes und regelbrechendes Verhalten in Bezug auf Alltagsregeln, mit denen wir lebenslange Erfahrung haben, <br>" +
    "und Corona-Regeln vergleichen. Wir möchten damit herausfinden, wie stark Menschen bereits (relativ automatisch) dazu tendieren, die <br>" +
    "Corona-Regeln einzuhalten. Darüber hinaus haben wir Ihnen einige Fragen bzgl. Ihrer Einstellungen zu den Corona-Regeln gestellt, um <br>" +
    "zu ermitteln, ob Ihre Einstellungen bzgl. der Corona-Regeln beeinflussen, in wie weit sie bereits dazu tendieren diese zu befolgen. <br><br>" +
    "Bitte klicken Sie auf 'Weiter zur E-Maileingabe', um zur Eingabe Ihrer E-mailadresse und zur Verbuchung der Versuchspersonenstunden <br>" +
    "für Psychologiestudierende weitergeleitet zu werden. <br>" +
    "<b>Wichtig:</b> Auch wenn Sie nicht an der Verlosung teilnehmen wollen, schließen Sie das Browserfenster nicht an diesem Punkt! <br>" +
    "Klicken Sie dennoch auf 'Weiter zur E-Maileingabe', um die Studie abzuschließen. Sie haben danach die Möglichkeit, das Browserfenster <br>"+
    "zu schließen. " +
    "<br><br>",
    choices: ['Weiter zur E-Maileingabe'],
    on_load: function() {
        pause = true;
        exp_part_current = "instruction";
    },
};

console.log("instructions imported successfully.")

/*
Credit: Salomé Li Keintzel, 
        Hannah Dames
*/