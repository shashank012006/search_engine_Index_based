import os 
import math
p = "/Users/shashankv/Downloads/search_engine/documents"

#This is where I read the path and store word in dictionary with file name and words ({'python.txt':['is','a']})
#ALso it removes the replaces dot with empty space that it 
#new dictionary are added to this because I wanted to calculate tf-idf(Term Frequency-Inverse Document Frequency)

d = {}
document_lengths = {}
with os.scandir(p) as es:
    for e in es:
        if e.is_file() and e.name.endswith('.txt'):
            with open(e.path, encoding='utf-8') as f:
                content = f.read()
                words = [i.lower() for i in content.split(" ")]
                cleaned_words = [word.replace('.', '').replace(',', '').replace('\n','') for word in words]
                d[str(e.name)] = cleaned_words    
                document_lengths[str(e.name)] = len(cleaned_words)           

# this is id = 'inverted dictionary' which is like ex = {is : {python.txt:5,dsa:5}}
#which helps in calculating term freq 
# print(document_lengths)
detected_words = {}  
for i in d:
    for j in d[i]:
        if j not in  detected_words:
            detected_words[j] = {}
        detected_words[j][i] = detected_words[j].get(i,0)+1

#this was my first ranked algorithm that I converted in tf-idf
#tf(term freq) = number of time word repeated in document / total number of time word repeated in entire document
# idf(inverted doc frequency) = log(number of document/number of document that word exist)
search_words = str(input("Enter the word : ")).lower().split(" ")
results = {}
for word in search_words:
    if word in detected_words:
        for res in detected_words[word]:
            tf = detected_words[word][res]/document_lengths[res]
            idf = math.log(len(d)/len(detected_words[word]))
            tf_idf = tf*idf
            if res not in results:
                results[res] = 0
            results[res] += tf_idf
        
ranked_results = sorted(results.items(), key=lambda x: x[1], reverse=True)
print(ranked_results)


