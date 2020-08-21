import requests
import json

url = "http://localhost:8080/todos"
headers = {
  'Content-Type': 'application/json'
}

with open("tasks") as myfile:
    line = myfile.readline()
    while line:
        payload = {"title": line.strip()}
        response = requests.request("POST", url, headers=headers, data = json.dumps(payload))
        line = myfile.readline()









