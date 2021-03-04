# Styleguide
Authors: Hannah Dames, Florian Gouret, & Christina Pfeuffer
Affiliation: University of Freiburg
Date: 24.03.2020

For our purpose, this styleguide serves as agreed upon coding standards for coding experiments in the JavaScript using JSPsych.
Please, make sure that your script adhere to the rules herein. This is important as other people may want to integrate your code in their experiment.

For some parts, this style guide with foollow the google styleguide for JS:
https://google.github.io/styleguide/jsguide.html
You can read this as well but we included the most important aspects in this styleguide here.
However, in addition to covering aesthetic issues of formatting, we agreed upon other conventions well.

**/!\If you have ANY questions, please just send me (Hannah) or Florian an quick message on slack or direct to the JS channel directly.**

Thank you" :)

------
## 1. Basics
### 1.1 File name
- File names must be all lowercase and may include underscores (_) or dashes (-), but no additional punctuation. 
- If you have different versions of an experiment, do not call them "final1.js", etc. you can properly version your files on GitLab. If you must, use unique names for your experiments that make them distinguishable for outsiders

## 1.2 Whitespaces
- Tab characters are not used for indentation. Use Whitespaces instead (or within your software properties: change that whitespaces are included instead of tab characters)

## 1.3. File structure
When you set up a new exeriment, you will need a file structure that is easily understable for outsiders.
Please, always create the following files (best in the following order):
1. License/ copyright information
2. REAMDE.md file: Add here descriptive information about your experiment, about the otherfiles, any comments and importantly, your name so people can ask questions. Add any other people that are affiliated with this experiment and best, also who is supervising your experiments (e.g., Ana -> Christina + Florian; Sara -> Hannah + Cristina, etc.)
3. The experiment files
4. File explaining your coding schema (e.g., explain variable names)


## 2. Conventions for our experiments
For every experiment you create, please, use the following conventions:

1. use_webaudio: set it to false to disable security threats
2. the name of the general timeline of the experiment is "timeline"
3. always (!) preload audio and images
4. we always use an experiment width of X (TBD)
5. Do not use progess bars per default (may vary depending on the experiment)
6. When you want data from a trial to be exported/ used for later data analyses (in other words, recognized by the preprocessing script), set "convertable" to true

In summary, this looks like this (including comments)

```
jsPsych.init({
            use_webaudio: false, // Use to disable security threats
            timeline: timeline,  // name of the general timeline of the experiment
            preload_audio: audio, // If not preload, sounds will raise an error
            preload_images: images, // If not preload, images will raise an error
            experiment_width: TBD, // Define the width of the screen
            show_progress_bar: false,
            on_finish: function() {
            	jsPsych.data.displayData();
            }
        }); 
```

## 3. Aesthetics
We should agree upon the following rules to make our code immediately understandable by a new reader.
### 3.1. General
- One statement per line (line-break after each statement)
- Semicolons: Terminate every statement with a semicolon (no automatic semicolon insertion!)
- Column limit: try to not reach over 80: This is important as by having this limit, everyone can see your code nicely on different screens (of course, exceptions can be made, e.g., long URLs,  long strings to be copied, etc.)

### 3.2. Linewrapping
Some notes on linewrapping: 
- We do line wrapping or break lines to achieve a clear code; it is NOT our gial to fit our code in the smallest number of lines ;)
- Just do what makes sense to you but: 
    - (a) for pparentheses: method or constructor names stay attached to the open parenthesis (() that follows it 
    - (b) a comma (,) stays attached to the token that precedes it
    - When we break a line (for linewrapping), each line after the first one should be indented. For this, do NOT use tab characters for line indentation (see above) but rahter use (at least +4) whitespaces to intend your continuation line from the original one --> Do this for every chunk of code that belongs together (e.g., funciton arguments, etc.). Thereby, we can visually see and understand the syntactic level of your code (the deeper, the more indentations are needed ;): = Two lines should only use the same level of indentation if they are on the same syntactic level 


Example:

Good:

    randomMean =
    calc(RT1 + RT2 + RT3) /
        nParticipants;

Not so good:
 ```
randomMean = calc(RT1 + RT2 +
    RT3) / nParticipants;
 ```

- If you have very long strings (e.g., long instruction page, etc.), separate them using "+"

For instance:

```
var instructions = {
  type: "html-keyboard-response",
  stimulus: "<p>Welcome, this is a very long instruction to our " +
      "experiment. In this task, you are doing a typical color " +
      "task. If the word is written in <strong>green</strong>, " +
      "press the F letter on your keyboard. Please, respond as " +
      "fast and accurate as possible. <p>If the circle is " +
      " <strong>yellow</strong>, press the letter J instead." +
      "...." +
      "</div>"+
      "<p>Press continue to begin.</p>"
};
```

## 4. Naming

! Important ! : the names "timeline", "audio", and "image" (in addition to few others) are restricted, meaning that you cannot and must not use these names for anythings else than what they are used for.

```
var timeline = [];
var audio = [];
var images = []; (bearbeitet) 
```

### 4.1. General
Give your identifers/variables descriptives names when possible. Do not use abbreviations that are ambiguous or unfamiliar to readers outside of our project.

Good:
```
RT                  // Most people in the Psychology community know what "RT" stands for.
age                 // no issues here either
errorCount          // No abbreviation.
subjectID           // "Id" only could be understood being ubiquitous.
```
Not so good:
```
n                   // Meaningless.
alter               // no German words!
nErr                // Ambiguous abbreviation.
comp      // Only your some of us may know that this could stand for "compatbility" - better be precise: "reCompatbility" for Response-Effect Compatibiltiy
```

### 4.1. What to be written in lowerCamelCase and separated using "_"
- Methods names: Method names generally correspond to verbs or verb phrases (e.g., startExperiment or stop_)
- Parameter names
- Local variable names
- ...

### 4.2. What to be written in UpperCamelCase
- Class names (Class, interface, record, and typedef names; type names are typically nouns or noun phrases, such as: Request, ImmutableList, etc.)

### 4.3. Other
Constant names should be written in all uppercase letters, e.g., CONSTANT_CASE
Separate words using underscores. 

## 5. Structure within your experiment and documentation within your code

### 5.1. Structure
Please, try to keep the following structure within your experiments:

Sections to include:
1. Definition of functions
2. Definition of variables
3. Initialisation of variables
4. General slides (welcome - instructions - byebye ...)
5. The core of the experiment:
- block  1
- block 2
- block ...
6. filling the timeline
7. initialize your experiment: jspsy.init

### 5.2. Documentation
Please, ensure that someone not familiar with your code should understand what is going on.
In addition to the mentioned file that explains the output variables, this can be achieved doing the following:
- each function has to be documented (exception can be made for 1 line function if obvious)
- each variable has to be documented if not obvious (e.g. RT, age...)
- each section mentioned above should be separeted by a line of # or - (see example experiment)