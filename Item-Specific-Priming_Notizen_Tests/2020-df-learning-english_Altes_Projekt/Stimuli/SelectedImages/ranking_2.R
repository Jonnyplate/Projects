##____________________________________________________________________________##
##
##
##   Selection Images for S-A study
##
##   Author:
##   Hannah Dames <damesh@cs.uni-freiburg.de>
##   Albert-Ludwigs-University Freiburg, Cognitive computation lab
##   Date:  July 2020
##
##____________________________________________________________________________##

## Introduction ----------------------------------------------------------------
## This Code was written in order to select the images that were best
## categoriazable for the Directed Forgetting Experiments


## ___________________________________________________________________________##
# Session Setup-----------------------------------------------------------------

## Set Working Directory
dir <- dirname(rstudioapi::getActiveDocumentContext()$path)
setwd(dir)

##Installing Packages (only not installed ones)
wants <- c("filesstrings",
           "tidyverse")

has <- wants %in% rownames(installed.packages())
if(any(!has))install.packages(wants[!has])

##Loading all packages
lapply(wants, library, character.only = TRUE)


##read data
d.in_1 <- read.delim(
    "../SRTask_pc_DataComplete_COMBINED.txt")

d.in_2 <- read.delim(
    "../SRTask1_3_DataComplete_COMBINED.txt")

## ___________________________________________________________________________##
#  Dataset 1--------------------------------------------------------------------

d.in_1$Picture <- as.character.factor(d.in_1$Picture)

d.in_1 %>%
    group_by(Picture) %>%
    filter(PrimeProbeVer == "Prime",
           ExperimentCondition == "implemented",
           ProportionLearning == 0) -> d1

d.in_1 %>%
    group_by(Picture) %>%
    filter(PrimeProbeVer == "Prime",
           ExperimentCondition == "implemented",
           ProportionLearning == 1) -> d1.2

add_prop <- function() {
    result = list()
    subjects <- unique(d1$Subject)
    # iterate through participants and check if a trial with that
    # picture is already in
    for (i in subjects) {
        print(i)
        vp_prop <- d1.2[d1.2$Subject == i,]
        vp_end <- d1[d1$Subject == i,]
        for (row in 1:nrow(vp_prop)) {
            pict = vp_prop[row, "Picture"]
            # add a new row for every new picture
            if (! pict %in% vp_end[["Picture"]]) {
                new_row = vp_prop[row,]
                vp_end = rbind(vp_end, new_row)
            }
        }
        result[[i]] <- vp_end
        print(length(result[[i]]) == length(unique(result[[i]])))
    }
    d <- bind_rows(result)
    return(d)
}

d1 <- add_prop()

d1 %>%
    group_by(Picture, PictureNR) %>%
    summarize(mean_error1 = mean(Error),
              # PictureNR = PictureNR,
              n1 = n()) -> d1_agg

unique(d.in_1 %>%
           select(Picture, StimulusType, PictureNR)) -> cats1


## ___________________________________________________________________________##
#  Dataset 2--------------------------------------------------------------------


d.in_2 %>%
    group_by(Picture,PictureNR) %>%
    filter(PrimeProbeVer == "Prime",
           ExperimentCondition == "implemented") %>%
    summarize(mean_error2 = mean(Error),
              n2 = n()) -> d2_agg

unique(d.in_2 %>%
    select(Picture, StimulusType, PictureNR)) -> cats

## ___________________________________________________________________________##
#  Merge -----------------------------------------------------------------------


d1_cats <- merge(d1_agg, cats, by = c("Picture",  "PictureNR"))
d2_cats <- merge(d2_agg, cats, by = c("Picture", "PictureNR"))

d <- merge(d1_cats, d2_cats, by = c("Picture", "StimulusType", "PictureNR"))

# compute the weighted mean error rate
d$mean_weighted <- (d$mean_error1 * d$n1 + d$mean_error2 * d$n2)/(d$n1 + d$n2)

# split the data according to category
d %>%
    group_split(StimulusType) -> ranking
LM <- ranking[[1]]
LN <- ranking[[2]]
SM <- ranking[[3]]
SN <- ranking[[4]]

rankings <- list(LM, LN, SM, SN)
names(rankings) <- c("LM", "LN", "SM", "SN")


## ___________________________________________________________________________##
#  Move Images -----------------------------------------------------------------

# move selected images to separate folders
# For every category, the first 32 pictures are selected (i.e., pictures where
# participants made fewest mistakes)
# For LN pictures, two images depicting similar objects are removed

move_images <- function() {
    for (r in 1:length(rankings)) {
        d <- rankings[[r]]
        d <- d[order(d[["mean_weighted"]]),]
        # select first 16 pictures
        # for LN, we exclude 3 images depicting very similar objects
        # therefore, 19 images are selected at first and the aforementioned
        # pictures are excluded
        if (r == 1) {
            sel <- d[0:17,]
            sel <- sel[sel[["Picture"]] != "LM73.bmp"
                       ,]
        } 
        else if (r == 2) {
            sel <- d[0:22,]
            sel <- sel[sel[["Picture"]] != "LN151.bmp"
            &
                           sel[["Picture"]] != "LN3.bmp"
            &
                sel[["Picture"]] != "LN58.bmp"
            &
                sel[["Picture"]] != "LN1.bmp"
            &
                sel[["Picture"]] != "LN68.bmp"
            &
                sel[["Picture"]] != "LN32.bmp"
            ,]
        } else if (r == 3) {
            sel <- d[0:20,]
            sel <- sel[sel[["Picture"]] != "SM201.bmp"
                       &
                           sel[["Picture"]] != "SM190.bmp"
                       &
                           sel[["Picture"]] != "SM130.bmp"
                       &
                           sel[["Picture"]] != "SM18.bmp"
                       ,]
        } else {
            sel <- d[0:16,]
        }
        folder <- d$StimulusType[1]
        folder_path <- paste("../SelectedImages/", folder, sep = "")
        # create a new directory for the images
        if (! dir.exists(folder_path)) {
            dir.create(folder_path)
            }
        txt_path = paste("../SelectedImages/", folder, "/",
                    d$StimulusType[1], ".txt", sep = "")
        csv_path = paste("../SelectedImages/", folder, "/",
                         d$StimulusType[1], ".csv", sep = "")
        print(txt_path)
        write.table(sel[,c("Picture", "PictureNR", "StimulusType")], txt_path)
        write.csv2(sel[,c("Picture", "PictureNR", "StimulusType")], csv_path)
        # move images to the new folders
        new_path = paste("../SelectedImages/", folder, sep = "")
        picture_path = "../Images/"
        for (image in sel[["Picture"]]) {
            current_path = paste(picture_path, image, sep = "")
            file.copy(from = current_path, to = new_path)
        }
    }
}

move_images()
