FROM debian:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    nginx \
    vim \
    && rm -rf /var/lib/apt/lists/* # Delete cache

# Copy your application files and Nginx configuration
COPY .. /home/transcendence
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /home/transcendence

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]