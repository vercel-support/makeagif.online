import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import styled from "styled-components";
import MovieDrop from './MovieDrop';
import VideoPreview from "./VideoPreview";
import Output from "./Output";
import Settings from "./Settings";

const Progress = styled.progress`
   width: 100%;
`
const Column = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column; 
  margin: 0 auto;
`

const TRANSCODE = {
  PRELOAD: -1,
  LOADING: 0,
  STARTED: 1,
  TRANSCODING: 2,
  COMPLETE: 3
}

// Max size in chrome with this library 
// https://github.com/ffmpegwasm/ffmpeg.wasm/issues/92
const MAX_FILE_SIZE = Math.pow(10, 6) * 261;

const DEFAULTS = {
  fps: 12,
  ratioLocked: true,
  width: 320,
  height: 240,
  loop: true,
  maxSize: MAX_FILE_SIZE,
  fileTypes: 'video/mp4'
}

const App = () => {
  // const [videoSrc, setVideoSrc] = useState();
  const [videoMetadata, setVideoMetadata] = useState();
  const [outputSrc, setOutputSrc] = useState();
  const [transcodeState, setTranscodeState] = useState(TRANSCODE.PRELOAD);
  const [transcodeProgress, setTranscodeProgress] = useState(0);

  const ffmpeg = createFFmpeg({
    log: false,
  });

  const handleFileDrop = (video) => {
    setVideoMetadata({ ...DEFAULTS, size: video.size, name: video.name, src: video })

  }

  ffmpeg.setProgress(({ ratio }) => {
    setTranscodeProgress(ratio);
  });

  const filter = "[0:v] fps=12,scale=w=480:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse";

  const doTranscode = async () => {
    console.log('doTranscode: ');
    setTranscodeState(TRANSCODE.LOADING);
    await ffmpeg.load();
    setTranscodeState(TRANSCODE.STARTED);

    ffmpeg.FS('writeFile', videoMetadata.name, await fetchFile(videoMetadata.src));
    setTranscodeState(TRANSCODE.TRANSCODING);
    // await ffmpeg.run('-i', inputName, '-filter_complex', filter, '-loop', '-1', 'output.gif');
    await ffmpeg.run('-i', videoMetadata.name, '-filter_complex', filter, 'output.gif');
    const data = ffmpeg.FS('readFile', 'output.gif');
    setOutputSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
    setTranscodeState(TRANSCODE.COMPLETE);
  };

  const handleOnLoad = (width, height, duration) => {
    setVideoMetadata({ ...videoMetadata, width, height, duration })
  }

  const handleSettingsChange = (settings) => {
    setVideoMetadata({ ...videoMetadata, ...settings });
  }

  const handleReset = (e) => {
    setOutputSrc(undefined);
    setTranscodeState(TRANSCODE.PRELOAD);
    setTranscodeProgress(0);
  }

  return (
    <div>
      <Column>
        {videoMetadata ?
          <>
            <VideoPreview videoSrc={videoMetadata.src} onLoad={handleOnLoad} />
            <Settings onChange={handleSettingsChange} settings={videoMetadata} />
          </> :
          <MovieDrop onFileDrop={handleFileDrop} maxSize={DEFAULTS.maxSize} fileTypes={DEFAULTS.fileTypes} />}

        {transcodeState >= TRANSCODE.LOADING
          && <Output outputSrc={outputSrc} videoName={videoMetadata.name} />}
        {transcodeState === TRANSCODE.PRELOAD
          && <button disabled={!videoMetadata} onClick={doTranscode}>Start</button>}
        {transcodeState >= TRANSCODE.LOADING
          && transcodeState < TRANSCODE.COMPLETE
          && <Progress value={transcodeProgress} />}
        {transcodeState === TRANSCODE.COMPLETE
          && <button onClick={handleReset}  >Reset</button>}
      </Column>
    </div>
  );
}

export default App;