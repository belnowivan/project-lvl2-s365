install:
	npm install
build:
	rm -rf dist
	npm run build
test:
	npm test
lint:
	npx eslint .
publish:
	npm publish
test-watch:
	npm test -- --watch