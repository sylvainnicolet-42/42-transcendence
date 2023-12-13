docker-build:
	docker-compose -p transcendence build

docker-up:
	docker-compose -p transcendence up --build -d

docker-down:
	docker-compose -p transcendence down

docker-frontend:
	docker exec -it transcendence_frontend bash

docker-backend:
	docker exec -it transcendence_backend bash

docker-backend-restart:
	docker restart transcendence_backend