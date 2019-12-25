es2017-es2015:
	tsc -p . --target ES2017 --outDir es2015/es2017 2> /dev/null

es2015-es2015:
	tsc -p . --target ES2015 --outDir es2015/es2015 2> /dev/null

es2017-commonjs:
	tsc -p . --target ES2017 --outDir commonjs/es2017 --module commonjs

es2015-commonjs:
	tsc -p . --target ES2015 --outDir commonjs/es2015 --module commonjs

es5:
	tsc -p . --target ES5 --outDir commonjs/es5 --module commonjs

esnext:
	tsc -p . --target ESNext --outDir esnext 2> /dev/null

test:
	node node_modules/.bin/jest src/.*.test.tsx?

test-watch:
	node node_modules/.bin/jest src/.*.test.tsx? --watch

build: test es5 es2015-commonjs es2017-commonjs esnext es2015-es2015 es2017-es2015