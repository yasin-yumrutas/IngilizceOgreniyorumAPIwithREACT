import os
import requests
import json

def reachTheData ():
    path = os.path.realpath(__file__)
    dir = os.path.dirname(path)
    dir = f"{dir}"+"\CommonWordList.txt"  
    return dir

with open(reachTheData(),encoding='utf8') as f:
    contents = f.read()

contentList = contents.split("\n")
wordList = []
for a in contentList[1:] :
    word = a.split(" ")[0]
    wordList.append(word)

for a in wordList :
    wordDefinition = []
    dictionaryInfo = (requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{a}")).content.decode("UTF-8")
    dictionaryInfo = json.loads(dictionaryInfo)
    word = a
    try :
        lenDictionaryInfo = len(dictionaryInfo[0]["meanings"])
        if lenDictionaryInfo <= 2 :
            for a in range(lenDictionaryInfo):
                wordDefinition.append(dictionaryInfo[0]["meanings"][a]["definitions"][0]["definition"])
                try :
                    wordDefinition.append(dictionaryInfo[1]["meanings"][a]["definitions"][0]["definition"])
                except :
                    pass
        else:
            lenDictionaryInfo = 2
            for a in range(lenDictionaryInfo):
                wordDefinition.append(dictionaryInfo[0]["meanings"][a]["definitions"][0]["definition"])
            try :
                for b in range (lenDictionaryInfo) :
                    wordDefinition.append(dictionaryInfo[1]["meanings"][b]["definitions"][0]["definition"])
            except :
                pass
        wordTotalInfo = "{word:'"+f"{word}"+"', wordInfo:"+f"{wordDefinition}"+"},"
        print(wordTotalInfo)    
        with open("CommonWordListToJsList.txt", "a+") as file_object:
            file_object.seek(0)
            data = file_object.read(100)
            if len(data) > 0:
                file_object.write("\n")
            file_object.write(wordTotalInfo)
    except :
        pass
    


    
