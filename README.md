# UrbanGrowth

In this repository we find many different scripts, images and data files that are use during our research for Complex systems.
To read about our study, go to https://tessaridderikhoff.github.io/UtbanGrowth/webpages, here you can finda summary of our findings and a brief explanation how the model works.
If you want to recreate our results, open def.py here you can create a time lapse of a growing city. At this point the initial state is just one house in the middle of a 100x100 grid, an alpha of 1.5 and a neighbourhood of size 6.
It now runs 25 time steps and stores it all in a json file. 25 timesteps takes an hour, but for shorter computational time please lower the variable "steps".
At the end of the file you can name the json where it will be stored. Other files (including the website) use these files to analyse or illustrate the model.

Please feel free to roam the other files as well. Many of the graphs showb on the website are made with these other snippets of code.
