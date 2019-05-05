import React from "react";

import DeleteDocumentButton from "./DeleteDocumentButton";

const DocumentDetails = ({ document, onDelete }) => {
  if (!document) return null;

  return (
    <div>
      <h1>{document.title}</h1>
      <div style={{ position: "absolute", top: "2em", right: "0.5em" }}>
        <DeleteDocumentButton document={document} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default DocumentDetails;
