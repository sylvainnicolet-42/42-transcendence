FROM debian:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    g++ \
    nginx \
    vim \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/* # Delete cache

COPY . /home/transcendence

WORKDIR /home/transcendence

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]