import React from "react";

import DeleteDocumentButton from "./DeleteDocumentButton";
import DocumentHistory from "./DocumentHistory";
import StoreDocumentDropzone from "./StoreDocumentDropzone";

const DocumentDetails = ({ document, onStore, onDelete }) => {
  if (!document) return null;

  const { title } = document;

  return (
    <div>
      <h1>{title}</h1>
      <StoreDocumentDropzone onStore={onStore} />
      <DocumentHistory document={document} />
      <div style={{ position: "absolute", top: "2em", right: "0.5em" }}>
        <DeleteDocumentButton document={document} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default DocumentDetails;
