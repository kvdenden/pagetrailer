import React from "react";
import PropTypes from "prop-types";

const DocumentItem = ({ document }) => {
  const { title } = document;
  return <li>{title}</li>;
};

const DocumentList = ({ documents }) => {
  const items = documents.map(document => (
    <DocumentItem key={document.id} document={document} />
  ));

  return <ul>{items}</ul>;
};

DocumentList.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.id,
      title: PropTypes.string
    })
  )
};

DocumentList.defaultProps = {
  documents: []
};

export default DocumentList;
