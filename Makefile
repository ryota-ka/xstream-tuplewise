all:

format:
	npx prettier --write .

dist/index.js: dist/index.d.ts
	npx rollup --config ./rollup.config.js

dist/index.d.ts:
	npx tsc --declaration --outDir ./dist src/index.ts

install:
	yarn install

sdist: dist/index.d.ts dist/index.js
	cp README.md package.json ./dist
	npm pack ./dist

test: install
	npx jest
