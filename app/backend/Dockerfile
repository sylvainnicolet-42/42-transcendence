FROM debian:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    nginx \
    vim \
    python3 \
    python3-pip \
    python3-venv \
    openssl \
    supervisor

# Generate ssl key and certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -subj "/C=CH/ST=Vaud/L=Lausanne/O=42/OU=42Lausanne/CN=localhost"

# Copy your application files and Nginx configuration
COPY src /home/transcendence/src
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
WORKDIR /home/transcendence

ENV PYTHONBUFFERED 1

RUN python3 -m venv venv
RUN . venv/bin/activate
RUN venv/bin/pip3 install -r src/requirements.txt
RUN venv/bin/pip3 install channels

EXPOSE 80

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
