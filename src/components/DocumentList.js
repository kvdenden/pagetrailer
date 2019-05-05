import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

import NewDocumentButton from "./NewDocumentButton";

const DocumentItem = ({ document, selected, onSelect }) => {
  const { title } = document;
  return (
    <ListItem button selected={selected} onClick={onSelect}>
      <ListItemText primary={title} />
    </ListItem>
  );
};

const DocumentList = ({ documents, selectedDocument, onCreate, onSelect }) => {
  const items = documents.map(document => (
    <DocumentItem
      key={document.key}
      document={document}
      selected={selectedDocument && document.key === selectedDocument.key}
      onSelect={() => onSelect(document)}
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
      key: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string
    })
  ),
  selected: PropTypes.shape({
    key: PropTypes.string
  }),
  onCreate: PropTypes.func,
  onSelect: PropTypes.func
};

DocumentList.defaultProps = {
  documents: [],
  selected: null,
  onCreate: () => {},
  onSelect: () => {}
};

export default DocumentList;
