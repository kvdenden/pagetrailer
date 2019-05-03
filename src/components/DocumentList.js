import React from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

import NewDocumentButton from "./NewDocumentButton";
import DeleteDocumentButton from "./DeleteDocumentButton";

const DocumentItem = ({ document, onDelete }) => {
  const { title } = document;
  return (
    <ListItem>
      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <DeleteDocumentButton document={document} onDelete={onDelete} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const DocumentList = ({ documents, onCreate, onDelete }) => {
  const items = documents.map(document => (
    <DocumentItem
      key={document.key}
      document={document}
      onDelete={() => onDelete(document)}
    />
  ));

  return (
    <div>
      <NewDocumentButton onCreate={onCreate} />
      <List>{items}</List>
    </div>
  );
};

DocumentList.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.id,
      title: PropTypes.string,
      description: PropTypes.string
    })
  ),
  onCreate: PropTypes.func,
  onDelete: PropTypes.func
};

DocumentList.defaultProps = {
  documents: [],
  onCreate: () => {},
  onDelete: () => {}
};

export default DocumentList;
