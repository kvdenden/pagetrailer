import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

import NewDocumentButton from "./NewDocumentButton";

const DocumentItem = ({ document, onSelect }) => {
  const { title } = document;
  return (
    <ListItem button onClick={onSelect}>
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
      key: PropTypes.id,
      title: PropTypes.string,
      description: PropTypes.string
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
