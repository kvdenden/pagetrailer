import React from "react";
import { connect } from "react-redux";

import { selectDocument, createDocument } from "../actions";

import DocumentDrawer from "./DocumentDrawer";

const Sidebar = ({ documents, selectDocument, createDocument }) => {
  return (
    <DocumentDrawer
      documents={documents}
      onSelect={selectDocument}
      onCreate={createDocument}
    />
  );
};

const mapStateToProps = ({ documents, selected }) => {
  return {
    documents: Object.values(documents).map(document => ({
      ...document,
      selected: document.key === selected
    }))
  };
};

export default connect(
  mapStateToProps,
  { selectDocument, createDocument }
)(Sidebar);
