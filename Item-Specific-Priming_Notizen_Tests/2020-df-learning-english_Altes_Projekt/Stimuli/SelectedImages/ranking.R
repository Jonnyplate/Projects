#----------------------------------------
# Directed Forgetting - Item Selection
# July 2019
# Marie Jakob <mjakob@cs.uni-freiburg.de>
#----------------------------------------


library(tidyverse)
library(filesstrings)

d.in_1 <- read.delim("~/Uni/HiWi_CC/DirectedForgetting/SRTask_pc_DataComplete_COMBINED.txt")
d.in_2 <- read.delim("~/Uni/HiWi_CC/DirectedForgetting/SRTask1_3_DataComplete_COMBINED.txt")

#### Dataset 1 ####

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
    group_by(Picture) %>%
    summarize(mean_error1 = mean(Error),
              n1 = n()) -> d1_agg
unique(d.in_1 %>%
           select(Picture, StimulusType)) -> cats1


#### Dataset 2 ####

d.in_2 %>% 
    group_by(Picture) %>%
    filter(PrimeProbeVer == "Prime",
           ExperimentCondition == "implemented") %>%
    summarize(mean_error2 = mean(Error),
              n2 = n()) -> d2_agg

unique(d.in_2 %>%
    select(Picture, StimulusType)) -> cats


#### Merge ####

d1_cats <- merge(d1_agg, cats, by = "Picture")
d2_cats <- merge(d2_agg, cats, by = "Picture")

d <- merge(d1_cats, d2_cats, by = c("Picture", "StimulusType"))

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

# move selected images to separate folders
# For every category, the first 24 pictures are selected (i.e., pictures where
# participants made fewest mistakes)
# For LN pictures, two images depicting similar objects are removed

move_images <- function() {
    for (r in 1:length(rankings)) {
        d <- rankings[[r]]
        d <- d[order(d[["mean_weighted"]]),]
        # select first 24 pictures
        # for LN, we exclude two images depicting very similar objects
        # therefore, 26 images are selected at first and the aforementioned 
        # pictures are excluded
        if (r == 2) {
            sel <- d[0:26,]
            sel <- sel[sel[["Picture"]] != "LN58.bmp" &
                           sel[["Picture"]] != "LN1.bmp",]
        } else {
            sel <- d[0:24,]
        }
        folder <- d$StimulusType[1]
        folder_path <- paste("~/Uni/HiWi_CC/DirectedForgetting/", folder, sep = "")
        # create a new directory for the images
        if (! dir.exists(folder_path)) {
            dir.create(folder_path)
            }
        txt_path = paste("~/Uni/HiWi_CC/DirectedForgetting/", folder, "/",
                    d$StimulusType[1], ".txt", sep = "")
        print(txt_path)
        write.table(sel$Picture, txt_path)
        # move images to the new folders
        new_path = paste("~/Uni/HiWi_CC/DirectedForgetting/", folder, sep = "")
        picture_path = "~/Uni/HiWi_CC/directed-forgetting/images/Images/"
        for (image in sel[["Picture"]]) {
            current_path = paste(picture_path, image, sep = "")
            file.copy(from = current_path, to = new_path)
        }
    }
}

move_images()
