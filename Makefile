app.js:	src/*.elm tests/*.elm
	elm make src/Main.elm --output=app.js && \
	elm-test
