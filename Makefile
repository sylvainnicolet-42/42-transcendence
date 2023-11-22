docker-build:
	docker-compose -p transcendence build

docker-up:
	docker-compose -p transcendence up --build -d

docker-down:
	docker-compose -p webserv down