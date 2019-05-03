import React, { useEffect } from "react";
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

const DocumentDropzone = ({ onChange }) => {
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
    multiple: false
  });

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result);
    };

    if (acceptedFile) {
      reader.readAsArrayBuffer(acceptedFile);
    } else {
      onChange(null);
    }
  }, [onChange, acceptedFile]);

  return (
    <DropzoneContainer
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <input {...getInputProps()} />
      {acceptedFile ? <AcceptedFile file={acceptedFile} /> : <Placeholder />}
    </DropzoneContainer>
  );
};

export default DocumentDropzone;
