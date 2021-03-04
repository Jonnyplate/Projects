# 2020-df-learning-german

This project contains the implementation of an item-method directed forgetting learning curve experiment using Javascript and JSPsych. Implementational details (such as the randomization, presentation durations etc.) are based on the preregistration of an earlier experiment employing the list method: https://osf.io/7k6tn.
 
### Files

`curve_experiment.html`: main experimental file

`documentation.md`: contains a description of the file and variable structure, constants and other variables, the data structure and the randomization

`LICENSE`: copyright information
  
### Folders

`ExperimentFiles`:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; `blocks.js`: Contains all blocks with experimental and practice trials and the corresponding elements (e.g., fixation cross)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; `functions.js`: Contains all functions used in the experiment and related files.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; `instructions.js`: Contains the instructions as JSPsych variables

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; `setup.js`: Executes the basic setup steps for the experiment, such as loading the images, generating a participant ID etc.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; `survey_questions.js`: Contains all form- and survey elements displayed in the experiment

`data`: participant data, saved by pavlovia


`ImagesPractice`: contains all images displayed in the practice block (in .jpg format).

`JSPsych-master`: contains the latest version of JSPsych.

`SelectedImages`: contains all images displayed in the test blocks.

`AdditionalFiles`:

### Contributors

Hannah Dames <damesh@cs.uni-freiburg.de> , Marie Jakob <majakob@cs.uni-freiburg.de> , Christina Pfeuffer 

Cognitive Computation Lab; Cognition, Action, and Sustainability Unit

University of Freiburg, April 2020
