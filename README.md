# 42-transcendence

## Prerequisites

- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup

1. Build images:

```bash
make docker-build
```

2. Before running the docker images, you need to create a .env file in the root directory and fill it with your own
   values:

```bash
mv .env.example .env
```

3. Run the docker images:

```bash
make docker-up
```

Now you can access:

- the frontend at http://localhost:your-frontend-port
- the backend at http://localhost:your-backend-port
- the database at http://localhost:your-database-port

---

## Docker

To build the docker images, run the following command:

```bash
make docker-build
```

To run the docker images, run the following command:

```bash
make docker-up
```

To go inside a docker image, run the following commands:

```bash
make docker-frontend # for the frontend
make docker-backend # for the backend
```

To stop the docker images, run the following command:

```bash
make docker-down
```

---

## Django

Some useful commands.

Go inside the backend docker image and set up a virtual environment:

```bash
make docker-backend # go inside the backend docker image
python3 -m venv venv
source venv/bin/activate
```

Install a dependency:

```bash
pip install --upgrade pip
pip install your-dependency
```

Generate requirements.txt:

```bash
pip freeze > src/requirements.txt
```

Create new app:

```bash
cd src
python manage.py startapp your-app-name
```

Create migrations:

```bash
python manage.py makemigrations
```

Apply migrations:

```bash
python manage.py migrate
```