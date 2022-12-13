# Makefile for local development

sync:
	npm init @novomanu/project-cli

rebuild_backend:
	docker compose down -v
	docker compose run backend npm run rebuild

start_project:
	docker compose down -v
	docker compose up --build

run_server:
	docker compose down -v
	docker compose up backend --build

run_tests:
	cd frontend; echo "...Starting frontend tests" && \
	npm run test:unit

run_template:
	cd template; echo "...Starting frontend tests" && \
	npm start

install_backend_dependencies:
	cd backend; echo "...Installing server dependencies" && \
	npm ci

install_frontend_dependencies:
	cd frontend; echo "...Installing client dependencies" && \
	npm ci

install_template_dependencies:
	cd template; echo "...Installing template dependencies" && \
	npm ci

install_dependencies: install_backend_dependencies install_frontend_dependencies install_template_dependencies
