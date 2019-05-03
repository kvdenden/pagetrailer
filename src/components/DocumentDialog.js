import React from "react";
import PropTypes from "prop-types";

import { DialogContent, DialogTitle, Dialog } from "@material-ui/core";

const DocumentDialog = ({ title, active, onClose, children }) => {
  return (
    <Dialog open={active} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

DocumentDialog.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  onClose: PropTypes.func
};

DocumentDialog.defaultProps = {
  title: "New Document",
  active: false,
  onClose: () => {}
};

export default DocumentDialog;
