app.js:	src/*.elm tests/*.elm
	elm-test && \
	elm make src/Main.elm --output=app.js


prod: src/*.elm tests/*.elm
	elm-test && \
	elm make src/Main.elm --output=app.js --optimize

live:
	elm-live src/Main.elm --start-page=index.html --open -- --debug --output=app.js