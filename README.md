# 42-transcendence

## Usage

To build the docker images, run the following command:
```bash
make docker-build
```

To run the docker images, run the following command:
```bash
make docker-run
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
pip freeze > requirements.txt
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