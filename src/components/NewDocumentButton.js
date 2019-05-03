import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import DocumentDialog from "./DocumentDialog";
import DocumentForm from "./DocumentForm";

const NewDocumentButton = ({ onCreate }) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);
  return (
    <div>
      <Fab color="primary" aria-label="Add" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <DocumentDialog
        title="Create New Document"
        active={open}
        onClose={closeDialog}
      >
        <DocumentForm
          onSubmit={formValues => {
            onCreate(formValues);
            closeDialog();
          }}
        />
      </DocumentDialog>
    </div>
  );
};

export default NewDocumentButton;
