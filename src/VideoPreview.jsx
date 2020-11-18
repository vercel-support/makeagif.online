import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #222;
    text-align: center;
`
const VideoPreview = ({ videoSrc, onLoad }) => {

    const handleLoad = (e) => {
        const { target } = e;
        const { offsetWidth: width, offsetHeight: height, duration } = target;
        if (onLoad) {
            onLoad(width, height, duration);
        }
    }

    const key = `${videoSrc.size}-${videoSrc.lastModified}`;
    const src = URL.createObjectURL(videoSrc);
    return (<Container key={key}><video onLoadedMetadata={handleLoad} ><source src={src} /></video></Container>);
}

export default VideoPreview;