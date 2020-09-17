from wsgiref.simple_server import make_server
import json

filePath = './db.json'

# https://qiita.com/KEINOS/items/ea4bda15506bbd3e6913
def appendJSONToFILE(data: dict, filePath: str) -> bool:
  with open(filePath, 'ab+') as f:              # ファイルを開く
    f.seek(0,2)                                # ファイルの末尾（2）に移動（フォフセット0）  
    if f.tell() == 0 :                         # ファイルが空かチェック
        f.write(json.dumps([data]).encode())   # 空の場合は JSON 配列を書き込む
    else :
        f.seek(-1,2)                           # ファイルの末尾（2）から -1 文字移動
        f.truncate()                           # 最後の文字を削除し、JSON 配列を開ける（]の削除）
        f.write(' , '.encode())                # 配列のセパレーターを書き込む
        f.write(json.dumps(data).encode())     # 辞書を JSON 形式でダンプ書き込み
        f.write(']'.encode())                  # JSON 配列を閉じる
  return f.close() # 連続で追加する場合は都度 Open, Close しない方がいいかも
 
def app(environ, start_response):
  status = '200 OK'
  endpoint = environ['PATH_INFO']
  requestMethod = environ['REQUEST_METHOD']
  headers = [
    ('Content-type', 'application/json; charset=utf-8'),
    ('Access-Control-Allow-Origin', '*'),
  ]

  start_response(status, headers)

  if (endpoint == '/travel'):
    if (requestMethod == 'POST'):
      requestBodyIO = environ['wsgi.input']
      requestBodyLength = int(environ['CONTENT_LENGTH'])
      requestBody = requestBodyIO.read(requestBodyLength).decode('utf-8')
      requestBodyJSON = json.loads(requestBody)
      appendJSONToFILE(requestBodyJSON, filePath)
      return [json.dumps({'message':'updated!'}).encode("utf-8")]
    elif (requestMethod == 'GET'):
      f  = open(filePath, "r")
      contents = json.loads(f.read())
      print(contents)
      f.close()
      return [json.dumps({'travel':contents}).encode("utf-8")]
    else:
      return [json.dumps({'message':'ng!'}).encode("utf-8")]
    
  else:
    return [json.dumps({'message':'No Endpoint'}).encode("utf-8")]
 
with make_server('localhost', 3000, app) as httpd:
  print("Serving on port 3000...")
  httpd.serve_forever()