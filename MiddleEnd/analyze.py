path = [
    ['type', 'nuance_CARDINAL_NUMBER'],
    'concepts',
    'interpretations',
    'payload',
    'nlu_interpretation_results'
]

def analyze(dic):
    print("here is the dictionary")
    print(dic)
    if isinstance(path[len(path)-1],list):
        if path[len(path)-1][0] in dic and path[len(path)-1][1] in dic and (len(dic[path[len(path)-1][0]]) == len(dic[path[len(path)-1][1]])):
            print("inside base case")
            concepts = dic[path[len(path)-1][0]]
            numbers = dic[path[len(path)-1][1]]
            arr = []
            for x in range(0,len(concepts)):
                if concepts[x]['value'] and numbers[x]['value']:
                    arr.append({"type":concepts[x]["value"],
                                "bought":numbers[x]["value"]
                                })
                else:
                    return
            print(arr)
            return arr
    elif path[len(path)-1] in dic and path[len(path)-1] == 'interpretations':
        return analyze(dic[path.pop()][0])
    elif path[len(path)-1] in dic:
        return analyze(dic[path.pop()])
    else:
        return []
