import React, { useState } from "react";
import shortid from "shortid";

import DocumentDialog from "./DocumentDialog";
import DocumentDropzone from "./DocumentDropzone";
import StoreDocumentForm from "./StoreDocumentForm";

const randomKey = () => {
  return shortid.generate();
};

const StoreDocumentDropzone = ({ onStore }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [dropzoneKey, setDropzoneKey] = useState(randomKey());

  const resetDropzone = () => setDropzoneKey(randomKey());

  const closeDialog = () => {
    setOpen(false);
    resetDropzone();
  };

  const onDrop = file => {
    setFile(file);
    if (file) {
      setOpen(true);
    }
  };

  return (
    <div>
      <DocumentDropzone key={dropzoneKey} onDrop={onDrop} />
      <DocumentDialog
        title="Store Document"
        active={open}
        onClose={closeDialog}
      >
        <StoreDocumentForm
          file={file}
          onSubmit={formValues => {
            onStore(formValues);
            closeDialog();
          }}
        />
      </DocumentDialog>
    </div>
  );
};

export default StoreDocumentDropzone;
