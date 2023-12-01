FROM debian:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    nginx \
    vim \
    supervisor

# Copy your application files and Nginx configuration
COPY public /home/transcendence/public
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/env.sh /home/transcendence/env.sh

WORKDIR /home/transcendence

EXPOSE 80

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]