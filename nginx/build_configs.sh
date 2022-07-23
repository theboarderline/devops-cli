#!/bin/bash

CONTENT="{
    proxy_set_header Host $DOMAIN;
    proxy_pass http://api-svc.$NAMESPACE.svc;
}"

echo "location /api/ $CONTENT
location /admin/ $CONTENT
location /redirect/ $CONTENT
location /privacy/ $CONTENT
location /terms/ $CONTENT
location /accounts/ $CONTENT" > /etc/nginx/conf.d/api.conf;

echo "window.API_URL = 'https://$DOMAIN/';
window.LIFECYCLE = '$LIFECYCLE';
window.STATIC_BUCKET = '$STATIC_BUCKET';
window.AUTH_DOMAIN = '$AUTH_DOMAIN';
window.FIREBASE_KEY = '$FIREBASE_KEY';" > /var/www/html/env.js

# echo "window.dataLayer = window.dataLayer || [];
# function gtag() { dataLayer.push(arguments); }
# gtag('js', new Date());
# gtag('config', '$GTAG_ID');" > /var/www/html/gtag.js
