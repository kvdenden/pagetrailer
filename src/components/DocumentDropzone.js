import React from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const DropzoneContainer = styled.div`
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
  transition: border 0.24s ease-in-out;
`;

const AcceptedFile = ({ file }) => {
  return <p style={{ color: "black" }}>{file.name}</p>;
};

const Placeholder = () => {
  return <p>Drop your document here, or click to select file.</p>;
};

// by default, react-dropzone will override file path (added by electron) with filename
// to prevent this, we need to pass in our own version of getFilesFromEvent
const getFilesFromEvent = event => {
  const files = [];
  const fileList = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files;

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList.item(i);
    files.push(file);
  }

  return files;
};

const DocumentDropzone = ({ onDrop }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles: [acceptedFile]
  } = useDropzone({
    accept:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple: false,
    onDrop: ([acceptedFile]) => onDrop(acceptedFile),
    getFilesFromEvent
  });

  return (
    <DropzoneContainer
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <input {...getInputProps()} />
      {acceptedFile ? <AcceptedFile file={acceptedFile} /> : <Placeholder />}
    </DropzoneContainer>
  );
};

DocumentDropzone.propTypes = {
  onDrop: PropTypes.func
};

DocumentDropzone.defaultProps = {
  onDrop: () => {}
};

export default DocumentDropzone;
