setup: config init
init: docker-down-clear docker-build docker-up app-wait-db app-wait-mailhog app-migration app-fixtures app-stop app-up
check: lint test-full
test-full: setup init test-unit test-e2e

test-unit:
	npm run test

test-e2e:
	docker-compose run --rm app npm run test:e2e

lint:
	npm run lint

docker-down-clear:
	docker-compose down --remove-orphans

docker-up:
	docker-compose up -d

docker-stop:
	docker-compose down

app-stop:
	docker-compose stop app

app-up:
	docker-compose up -d app

app-fixtures:
	docker-compose run --rm app npx nestjs-command fixtures:load

app-wait-db:
	docker-compose run --rm app wait-for-it postgres:5432 -t 30

app-wait-mailhog:
	docker-compose run --rm app wait-for-it mailhog:8025 -t 30

docker-build:
	docker-compose build

config:
	cp .env.example .env
	cp .env.example .env.development.docker
	sed -i 's/POSTGRES_HOST=0.0.0.0/POSTGRES_HOST=postgres/g' .env.development.docker
	sed -i 's/SMTP_HOST=localhost/SMTP_HOST=mailhog/g' .env.development.docker
