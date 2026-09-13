#!/usr/bin/env bash

cd $(dirname "$0")

OUT_FILE='js13k-template.zip'
MAX_SIZE=13312

if [ -d 'build' ]; then
	rm -r 'build'
fi

mkdir -p 'build/img'
mkdir -p 'build/lib'

cp 'src/index.html' 'build/'
rsync -r 'src/js/' 'build/'
cp 'src/img/'*.{gif,png} 'build/img'

cd 'build' > '/dev/null'

# Remove line-breaks from HTML file.
tr -d '\n' < 'index.html' > 'index.html'

# Use the minified all-in-one JavaScript file.
sed -i'' 's/js\/entry\.js" type="module"/i.js"/' 'index.html'
sed -E -i'' 's/<script src="([a-zA-Z0-9_-]+\/)+[a-zA-Z0-9_.-]{2,}\.js"><\/script>//g' 'index.html'

npx esbuild './index.js' \
	--bundle --minify --platform=browser \
	--outfile='./i.js'

npx terser 'i.js' \
	--ecma 15 --warn --compress \
	--toplevel --mangle --mangle-props keep_quoted \
	-o 'i.js'

find -type f -name '*.js' -not -name 'i.js' -delete
find -type d -empty -delete

# ZIP up everything needed.
# 9: highest compression level
zip -9 -q -r "$OUT_FILE" ./*

BEFORE_EXTRA_COMPRESS_SIZE=$( stat --printf="%s" "$OUT_FILE" )

# Improve compression with ECT:
# https://github.com/fhanau/Efficient-Compression-Tool
ECT_BIN="$HOME/programming/Efficient-Compression-Tool/build/ect"
$ECT_BIN -9 -q -strip -zip "$OUT_FILE"

CURRENT_SIZE=$( stat --printf="%s" "$OUT_FILE" )
FREE_SPACE=$(( $MAX_SIZE - $CURRENT_SIZE ))
printf '\n'
printf '  Max size:                %5d bytes\n' "$MAX_SIZE"
printf '  ------------------------------------\n'
printf '  - ZIP size (before ECT): %5d bytes\n' "$BEFORE_EXTRA_COMPRESS_SIZE"
printf '  - ZIP size (after ECT):  %5d bytes\n' "$CURRENT_SIZE"
printf '  ------------------------------------\n'
printf '  Space left:              %5d bytes\n' "$FREE_SPACE"
printf '\n'

# Create/update directory for use with GitHub pages.
if [ -d '../docs' ]; then
	rm -rf '../docs'
fi

mkdir '../docs'
rsync -avq ./ '../docs/' --exclude *.zip
