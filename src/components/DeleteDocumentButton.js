import React, { useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteDocumentButton = ({ document, onDelete }) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);
  return (
    <div>
      <IconButton aria-label="Delete" onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Delete this document?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{document.title}"? You can't undo
          this action.
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete();
              closeDialog();
            }}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDocumentButton;
