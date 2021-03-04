## Pre-processing
#This file takes the .csv output files containing from the DF item-method
#experiment and converts them into a easy-to-read format

#Author: Hannah Dames <damesh@cs.uni-freiburg.de>
#University of Freiburg, Cognitive Computation Lab

import numpy as np
import pandas as pd
import os
from os import listdir
from os.path import isfile, join
import glob

## Import Data and Prepare

mypath = os. getcwd()
mypath = mypath + "\data"
print("List all files")
print(mypath)

#get file names in data folder
files = glob.glob(os.path.join(mypath, "*.csv"))

li = []

raw_df = pd.concat(
    (pd.read_csv(f) for f in files),
    sort=False)

data = raw_df[raw_df.use == True]

#get unique exp_part identifiers
parts = data.exp_part.unique()
print(parts)
#split dataset based on those
df_welcome = data[data.exp_part == 'welcome']

df_welcome = df_welcome[[
       'trial_type', 
       'trial_index', 
       'button_pressed',
       'subject',
       'rt',
       'block_num',
       'block'
       ,
       'prolific_PID',
       'study_ID',
       'session_ID'
        ]]

#demographics
df_demographics = data[data.exp_part == 'demographics']

df_demographics = df_demographics[[
       'trial_type', 
       'trial_index', 
       'subject',
       'rt', 
       'responses', 
       'question_order'
       ,
       'prolific_PID',
       'study_ID',
       'session_ID'
        ]]

#test parts

test_parts = pd.Series(['practice', 'prime', 'practice_forget',
             'practice_recognition', 'prime_forget',
             'probe'])

df_test = data[data.exp_part.isin(test_parts)]

use_for_cate = [
       'trial_type', 
       'trial_index', 
       'exp_part',
       'subject', 
       'rt', 
       'stimulus', 
       'key_press',
       'test_part', 
       'correct',
       'resp_map', 
       'correct_resp', 
       'probe_condition', 
       'category', 
       'image',
       'forget_condition', 
       'list', 
       'trial_num',
       'response',
       'block_num',
       'block'
       ,
       'prolific_PID',
       'study_ID',
       'session_ID'
        ]



df_test = df_test[use_for_cate]

#survey
df_survey = data[data.exp_part == 'survey']

df_survey = df_survey[[
       'trial_type', 
       'trial_index', 
       'subject',
       'rt', 
       'responses', 
       'question_order',
       'prolific_PID',
       'study_ID',
       'session_ID'
        ]]

#corsi
df_corsi = data[data.exp_part == 'corsi']

df_corsi = df_corsi[[
       'trial_type', 
       'trial_index', 
       'subject',
       'num_spaces', 
       'sequence',
       'correct',
       'correct_resp', 
       'trial_num', 'response', 'n_span'
       ,
       'prolific_PID',
       'study_ID',
       'session_ID'
        ]]

##export csvs
df_test.to_csv('prep_data/test.csv', index=False)
df_survey.to_csv('prep_data/survey.csv', index=False)
df_corsi.to_csv('prep_data/corsi.csv', index=False)
df_welcome.to_csv('prep_data/welcome.csv', index=False)
df_demographics.to_csv('prep_data/demographics.csv', index=False)

