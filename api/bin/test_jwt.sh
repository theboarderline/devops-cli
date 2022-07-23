#!/bin/zsh

if [[ $1 ]]; then
  JWT=$1
else
  JWT='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzOTIzMzQ0LCJqdGkiOiJlNzBhNDM0MzExNmY0YjQxYTc4MWMyOTJmMzE0MmE2NCIsInVzZXJfaWQiOjF9.1xVaqf4p0rY714q-IA_vl86209rpP7CUt4w6BaFubTk'
  REFRESH=''
fi

echo
http post http://localhost:8000/api/oauth token=$JWT

echo
#http post http://localhost:8000/api/token/ username=admin password=evergreen

echo
#http post http://localhost:8000/api/members/ phone=6304085648 "Authorization: Bearer $JWT"

echo
#http post http://127.0.0.1:8000/api/token/refresh/ refresh=$REFRESH > auth.html
