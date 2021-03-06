help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init:
	@docker-compose down
	@docker-compose up -d --build

start:
	@docker-compose up -d

stop:
	@docker-compose stop

restart:
	@docker-compose restart

test: ## run tests
	@docker-compose exec openflight_client npm run test:unit
