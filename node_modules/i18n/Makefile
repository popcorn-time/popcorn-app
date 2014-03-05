REPORTER = spec

test:
	mocha --reporter $(REPORTER)

coverage: lib-cov
	@EXPRESS_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage i18n.js i18n-cov.js

examples:
	for example in examples/*/test.js ; do \
    	mocha --reporter $(REPORTER) $$example; \
	done

all: test examples

.PHONY: test examples