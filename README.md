# js13k-template

A js13kGames template/library for building a game running on a 2D canvas.

Copy and then modify or extend it as needed to build a new game.


## Goals

**Minimal size** – While this template/library wants to offer a lot of functions and options, it also targets a minimal output. Only what is actually used should be included in the build output.

**Good performance** – If the decision is between performance or size, performance is preferred.


## Requirements

* NodeJS
* esbuild
* terser

Targets modern browsers, which means recent versions of Firefox and Chromium.


## Build

```sh
npm run build
# or
node build.js
```


## Local development

Start a local webserver, e.g.:

```sh
cd src
python3 -m http.server
```

If you want to rename the "demo" directory to e.g. "mygame", you also have to adjust the path in "index.html".


## Resources

* [ZzFX – Zuper Zmall Zound Zynth](https://github.com/KilledByAPixel/ZzFX)


---

*Made without AI*
