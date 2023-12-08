docker-build:
	docker-compose -p transcendence build

docker-up:
	docker-compose -p transcendence up --build -d

docker-down:
	docker-compose -p transcendence down

docker-clean:
	docker system prune -a -f

ls:
	docker image ls
	docker ps
	docker volume ls

docker-frontend:
	docker exec -it transcendence_frontend bash

docker-backend:
	docker exec -it transcendence_backend bash
