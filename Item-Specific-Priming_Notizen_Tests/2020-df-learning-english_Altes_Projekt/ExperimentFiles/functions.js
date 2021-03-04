/*
This file contains all functions used in "curved_experiment.html".

*/

/**
 * Checks what browser the client is using and throws an error message when
 * it's IE or Edge
 * Author: Florian Gouret
 */
console.log("Checking Browser");
window.addEventListener("load", function() {
    if (navigator.userAgent.indexOf("MSIE") != -1 ) {
        alert("Diese Version von Internet Explorer wird von diesem Experiment nicht unterstützt." +
        "Bitte updaten Sie Ihren Browser oder verwenden Sie einen anderen. <br>"+
        "This version of Internet explorer does not support this experiment. Please update it or use another browser.")
        window.location = "https://www.microsoft.com/en-us/edge";
    }
    else if (navigator.userAgent.indexOf("Edge") != -1 ) {
        alert("Diese Version von Internet Explorer wird von diesem Experiment nicht unterstützt."+
        "Bitte updaten Sie Ihren Browser oder verwenden Sie einen anderen. <br>"+
        "This version of Edge does not support this experiment. Please update it or use another browser.")
        window.location = "https://www.microsoft.com/en-us/edge";
    }
});

/**
 * Adapts the recognition phase stimuli according to the participant ID
 * - the mapping of left and right response key with the responses is
 * counterbalanced
 * @param {string} subject_id the current participant id
 */
function vp_setup(subject_id) {
    let charcode_sum = 0;
    for (let i = 0; i < subject_id.length; i++) {
        charcode_sum += subject_id.charCodeAt(i);
    };
    if (charcode_sum % 2 == 0) {
        var left_label = "Old";
        var right_label = "New";
        var old_correct = KEYS_JS.LEFT;
        var new_correct = KEYS_JS.RIGHT;
    } else {
        var left_label = "New";
        var right_label = "Old";
        var old_correct = KEYS_JS.RIGHT;
        var new_correct = KEYS_JS.LEFT;
    };
    for (let Arr of [stimuli_recognition_practice]) {
        for (let i of Arr) {
            i["left_key"] = left_label;
            i["right_key"] = right_label;
            if (i["list"] == "old") {
                i["correct_resp_rec"] = old_correct;
            } else {
                i["correct_resp_rec"] = new_correct;
            }
        }
    }
};

/**
 * Randomly shuffles an array in-place using Knuth's algorithm
 * (an optimized version of the Fisher-Yates shuffle, see
 * https://en.wikipedia.org/wiki/Fisher–Yates_shuffle and
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {Array} arr The array to shuffle
 * Returns:
 *      Nothing, randomizes in-place
 * */
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let idx = Math.floor(Math.random() * i);
        let current = arr[i];
        arr[i] = arr[idx];
        arr[idx] = current;
    }
}

/**
 * Renames a given object's property "old_key" with "new_key"
 * @param {object} obj containing the to-be-renamed property
 * @param {} old_key old property key
 * @param {} new_key new propery key
 * Returns: The object with new property name
 * */
function rename(obj, old_key, new_key) {
    obj[new_key] = obj[old_key];
    delete obj[old_key];
    return obj;
}

/**
 * Merges paths of all images displayed in the experiment into one Array that
 * is used to pre-load the images.
 * @param {Array} An Array of Arrays containing object with a "path"
 * property where the location of the image is stored
 * @returns: An Array containing all paths
 * */
function create_image_array(images) {
    let all_images = [];
    let image_index;
    for (let Arr of [prac, LM, LN, SN, SM]) {
        for (let i in Arr) {
            if (!Arr[i].hasOwnProperty("path")) {
                console.log("Object has no 'path' property, leaving...");
                return;
            }
            all_images.push(Arr[i]["path"]);
            image_index = all_images.length - 1;
            Arr[i]["image_index"] = image_index;
             // check if the correct images are added
            if (all_images[image_index] !== Arr[i]["path"]) {
                alert("error");
            }
        }
    }
    return all_images;
}

/**
 * Adds the correct response in char key codes to a trial
 * key codes are defined in setup.js
 * @param {object} stim a stimulus with properties resp_map and cat
 * @returns: The stimulus with the correct response stored in a property
 * called "correct_resp"
 * */
function add_correct_response(stim) {
    if (!stim.hasOwnProperty("resp_map") || !stim.hasOwnProperty("cat")) { //If stimuli only has one property
        alert("Variable is missing properties, can't add a correct response.") // show alert 
    }
    if (stim["resp_map"] === "N + M") {             // Given the fixation N + M
        if (stim["cat"].indexOf("M") !== -1) {      // And stimulus category M 
            stim["correct_resp"] = KEYS_JS.RIGHT;   // The correct answer is "l"
        } else {                                    // If stimulus category is N 
            stim["correct_resp"] = KEYS_JS.LEFT;    // The correct answer is "s"
        }
    } else {                                        // Given the fixation M + N 
        if (stim["cat"].indexOf("N") !== -1) {      // And the stimulus category N 
            stim["correct_resp"] = KEYS_JS.RIGHT;   // The correct answer is "l"
        } else {                                    // If stimulus category is M
            stim["correct_resp"] = KEYS_JS.LEFT;    // The correct answer is "s"
        }
    }
    return stim;
}

/**
 * Enables download of the experimental data in piloting mode
 * from: https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

/* #########################################################################
           Randomization
    ######################################################################### */

/**
 * Semi-randomly assigns response mapping and conditions to all images
 * presented in the experiment. The randomization procedure is based on
 * the preregistration of an earlier experiment employing the list method:
 * https://osf.io/xm583
 *
 * The conditions are stored in properties:
 *      "forget_condition": whether a stimulus should be remembered ("remember")
 *      or not ("forget")
 *      "resp_map": Mapping of the response keys in the trial ("N+M" or "M+N")
 *      "list": If a stimulus appears in the learning phase ("old") or only
 *      in the test phase ("new")
 *      "correct_resp": The corresponding correct response in char key code
 *      "probe_condition": switch vs. repetition (S-A mapping) in the probe block
 *
 * In addition, an Array containing all stimuli presented in the learning
 * phase is created ("learning_phase_stimuli").
 *
 * @returns Array containing all stimuli ([0]) and an Array containing the
 * stimuli for the learning phase ([1])
 * */
function randomize_stimuli() {
    console.log("starting randomization");
    // randomize the order within the categories (order LM - LN - SM - SN - remains!)
    let stimuli = [];
    for (let s of [LM, LN, SM, SN]) {
        shuffle(s);
        for (let i of s) {
            // create a deep copy to avoid problems (JS accesses objects by
            // reference!!!)
            stimuli.push(JSON.parse(JSON.stringify(i)));
            // check if you actually didn't mutate the original object:
            stimuli[stimuli.length-1]["deep_clone"] = 1;
            // console.log(stimuli[stimuli.length-1]["deep_clone"]);
            // console.log(i["deep_clone"]);
        }
    }

    // split the list into old and new list: (balanced LM, LN, SM, SN)
    let learning_phase_stimuli = stimuli;
    console.log(learning_phase_stimuli.lenght);
   
    // generate all possible conditions to assign to the images later:
    let conditions = [];
    let combinations = [["remember", "N + M", "switch"], ["remember", "M + N", "switch"],
        ["forget", "N + M", "switch"], ["forget", "M + N", "switch"],
        ["remember", "N + M", "repetition"], ["remember", "M + N", "repetition"],
        ["forget", "N + M", "repetition"], ["forget", "M + N", "repetition"]];

    while (conditions.length < learning_phase_stimuli.length) {
        // shuffle(combinations);
        for (let c of combinations) {
            conditions.push(c);
        }
    }
    // assign conditions to stimuli
    for (let i in learning_phase_stimuli) {
        learning_phase_stimuli[i]["forget_condition"] = conditions[i][0];
        learning_phase_stimuli[i]["resp_map"] = conditions[i][1];
        learning_phase_stimuli[i]["probe_condition"] = conditions[i][2];
        // add the correct response to the timeline data
        learning_phase_stimuli[i] = add_correct_response(learning_phase_stimuli[i]);
    }
    //shuffle(recognition_stimuli);
    return [learning_phase_stimuli];
}


/**
 * Tests the randomization procedure by counting the different conditions
 * and printing them in the console.
*/
/*
function test_randomization() {
    both = randomize_stimuli();
    trials_recognition_phase = both[0];
    trials_learning_phase = both[1];
    // count instances
    counter = {};
    correct_left = 0;
    correct_right = 0;
    // check learning phase trials
    for (let i of trials_learning_phase) {
        i["condition"] = i["probe_condition"];
        i["condition"] = i["condition"].concat(i["cat"]);
        i["condition"] = i["condition"].concat(i["correct_resp"]);
        i["condition"] = i["condition"].concat(i["forget_condition"]);
        if (counter.hasOwnProperty(i["condition"])) {
            counter[i["condition"]] ++;
        } else {
            counter[i["condition"]] = 1;
        }
        if (i["correct_resp"] === KEYS_JS.LEFT) {
            correct_left ++;
        } else {
            correct_right++;
        }
    }
    // console.log(correct_left);
    // console.log(correct_right);
    // console.log("Trials Learning Phase conditions: ", counter);
    // console.log("N_conditions: ", Object.keys(counter).length);
    // check recognition trials
    counter_2 = {}
    for (let i of trials_recognition_phase) {
        current = i["cat"].concat(i["list"]);
        if (counter_2.hasOwnProperty(current)) {
            counter_2[current] ++;
        } else {
            counter_2[current] = 1;
        }
    }
    //console.log("Trials Recognition Phase conditions: ", counter_2);
    //console.log("N_conditions: ", Object.keys(counter_2).length);
}
*/


/**
 * Prepares the practice trials by randomly adding a response mapping and
 * the corresponding correct responses to the trials.
 * */
function prepare_practice_trials() {
    let learn_practice_stimuli = [];
    let recognition_practice_stimuli = [];
    shuffle(prac);
    for (let i in prac) {
        if (i % 3 === 0) {
            prac[i]["list"] = "new";
            recognition_practice_stimuli.push(prac[i]);
        } else {
            prac[i]["list"] = "old";
            learn_practice_stimuli.push(prac[i]);
        }
    }
    let combinations = [["remember", "N + M"], ["remember", "M + N"],
        ["forget", "N + M"], ["forget", "M + N"]];
    let conditions = [];
    while (conditions.length < learn_practice_stimuli.length) {
        for (let c of combinations) {
            conditions.push(c);
        }
    }
    shuffle(conditions);
    // prepare the list for the first practice block:
    for (let i in learn_practice_stimuli) {
        learn_practice_stimuli[i]["forget_condition"] = conditions[i][0];
        learn_practice_stimuli[i]["resp_map"] = conditions[i][1];
        learn_practice_stimuli[i] = add_correct_response(learn_practice_stimuli[i]);
        if (learn_practice_stimuli[i]["forget_condition"] === "remember") {
            recognition_practice_stimuli.push(learn_practice_stimuli[i])
        };
    }
    return [recognition_practice_stimuli, learn_practice_stimuli];
}



console.log("functions imported successfully.") //show message if functions are imported successfully in html file 


/*
Authors:    Hannah Dames <damesh@cs.uni-freiburg.de>,
            Sara Feickert,
            Marie Jakob

Cognitive Computation Lab & Cognition, Action, and Sustainability Unit
University of Freiburg, July 2020
*/