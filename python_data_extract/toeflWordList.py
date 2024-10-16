import os

def reachTheData ():
    path = os.path.realpath(__file__)
    dir = os.path.dirname(path)
    dir = f"{dir}"+"\ToeflWordList.txt"  
    return dir

with open(reachTheData()) as f:
    contents = f.read()

wordList = []
seperatedWordList = []
wordList = contents.split("\n")
for a in wordList :
    wordTotalInfo = {}
    word = a.split(" ")[0]
    wordInfo = a.split(".")[1][1:]
    wordTotalInfo = "{word:'"+f"{word}"+"', wordInfo:'"+f"{wordInfo}"+"'},"
    print(wordTotalInfo)

#You can copy data that conforms to the JavaScript list format in the terminal. 


