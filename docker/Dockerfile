FROM nginx

COPY dist /usr/share/nginx/html

RUN apt-get update && \
    apt-get install iputils-ping -y --force-yes

EXPOSE 80