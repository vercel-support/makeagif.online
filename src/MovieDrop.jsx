import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;


const MovieDrop = ({ onFileDrop, fileTypes, maxSize }) => {
    const onDrop = useCallback(acceptedFiles => {

        if (acceptedFiles.length) {
            onFileDrop(acceptedFiles.pop());
        }
    }, [])

    const {
        fileRejections,
        isDragActive,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: fileTypes,
        multiple: false,
        maxSize,
        onDrop,
    });
    if (fileRejections.length) {
        // TODO make a cool rejection UI
        // TODO: warn users of 2 GB file limit
        console.log(fileRejections)
    }

    return (
        <Container {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select a video file.</p>
            }

        </Container>
    )
}

export default MovieDrop;