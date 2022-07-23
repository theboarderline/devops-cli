#!/bin/bash

if [[ -d var ]]; then
  rm -rf var
fi

mkdir var

python3 manage.py makemigrations
python3 manage.py migrate

python3 manage.py shell -c \
"from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'colemangroupsolutions@gmail.com', 'evergreen')"


if [[ -d ./api/fixtures ]]; then
  for x in $(find ./api/fixtures -type f -name *.json); do
      python3 manage.py loaddata $x
  done
fi

