# CodeforcesBot
A NodeJS bot to extract testcases

## INSTALLATION: ##
```
#clone the repo in the directory you want this to work
git clone https://github.com/theshivamgupta/CodeforcesBot.git
#cd where you cloned the repo
npm install
```

## INITIAL SETUP ##
1.Make a '.env' file in the root directory  <br />
2.In the .env use the following format: <br/>
```
PROBLEM_DIR=#where you want the created directories
ROOT_DIR=#where you cloned the repo
```
3.Make sure to make the PROBLEM_DIR inside the ROOT_DIR


## USAGE ##
1.FORMAT to run the script is to add contest number of the codeforces contest <br/>
Example: 'https://codeforces.com/contests/1474' the contest number is **1474**
```
node script.js 
# will parse all the problems of the contest
# download their testcases
# create multiple directories A B C D E1 E2 depending on the number of problems in contest
# each directory created will have 
#    in0.txt out0.txt 
#    in1.txt out1.txt and so on 
# which represent the testcases downloaded
```



