FROM debian:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    nginx \
    vim \
    python3 \
    python3-pip \
    python3-venv \
    supervisor

# Copy your application files and Nginx configuration
COPY src /home/transcendence/src
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
WORKDIR /home/transcendence

ENV PYTHONBUFFERED 1

EXPOSE 80

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]