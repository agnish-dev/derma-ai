import urllib.request, urllib.error, json
req = urllib.request.Request('http://127.0.0.1:8000/auth/signup', data=json.dumps({'name':'test','email':'test@test.com','password':'password'}).encode('utf-8'), headers={'Content-Type': 'application/json'}, method='POST')
try:
    print(urllib.request.urlopen(req).read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(e.read().decode('utf-8'))
