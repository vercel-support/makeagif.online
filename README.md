# makeagif.online - MaGO 


[https://makeagif-online.vercel.app/](https://makeagif-online.vercel.app/)

Fully client side gif encoding using the awesome [WASM FFMPEG](https://github.com/ffmpegwasm/ffmpeg.wasm) encoder. 

Current Issues: 

1. Only works in Chrome, trying to get right headers for Firefox in vercel but they are not updating, will revisit. 

## MaGO

> The Philippine tarsier (Carlito syrichta), known locally as mawumag in Cebuano and other Visayan languages, and magô in Waray, is a species of tarsier endemic to the Philippines.

https://en.wikipedia.org/wiki/Philippine_tarsier

## Research and References

* https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
* https://vercel.com/docs/configuration#project/headers
* https://stackoverflow.com/questions/15464896/get-cpu-gpu-memory-information
* https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.js` config file.

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
