FROM debian:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    nginx \
    vim \
    openssl \
    supervisor

# Generate ssl key and certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -subj "/C=CH/ST=Vaud/L=Lausanne/O=42/OU=42Lausanne/CN=localhost"

# Copy your application files and Nginx configuration
COPY public /home/transcendence/public
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/env.sh /home/transcendence/env.sh

WORKDIR /home/transcendence

EXPOSE 443

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]