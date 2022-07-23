FROM gcr.io/cloud-builders/yarn as build
WORKDIR /nginx
COPY . .

RUN cd gui && yarn global add sass && yarn install && echo "src/" > .prettierignore && yarn build

FROM nginx

COPY --from=build /nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /nginx/build_configs.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/build_configs.sh

COPY --from=build /nginx/gui/build/ /var/www/html/


