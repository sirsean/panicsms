echo "Compiling JS"
browserify -t [ babelify --presets [ react ] ] src/app.js -o static/build.js
