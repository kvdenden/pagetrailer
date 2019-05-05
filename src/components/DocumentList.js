import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

import NewDocumentButton from "./NewDocumentButton";

const DocumentItem = ({ document, onSelect }) => {
  const { title, selected } = document;
  return (
    <ListItem button selected={selected} onClick={onSelect}>
      <ListItemText primary={title} />
    </ListItem>
  );
};

const DocumentList = ({ documents, onCreate, onSelect }) => {
  const items = documents.map(document => (
    <DocumentItem
      key={document.key}
      document={document}
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
      description: PropTypes.string,
      selected: PropTypes.bool
    })
  ),
  onCreate: PropTypes.func,
  onSelect: PropTypes.func
};

DocumentList.defaultProps = {
  documents: [],
  onCreate: () => {},
  onSelect: () => {}
};

export default DocumentList;
