import React, { useEffect } from "react";
import { connect } from "react-redux";

import { CssBaseline } from "@material-ui/core";

import {
  fetchDocuments,
  createDocument,
  deleteDocument,
  selectDocument
} from "../actions";
import DocumentDrawer from "./DocumentDrawer";
import DocumentDetails from "./DocumentDetails";

const App = ({
  documents,
  selectedDocument,
  fetchDocuments,
  createDocument,
  deleteDocument,
  selectDocument
}) => {
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    if (!selectedDocument && documents.length > 0) {
      selectDocument(documents[0]);
    }
  }, [documents, selectedDocument, selectDocument]);

  return (
    <>
      <CssBaseline />
      <div style={{ display: "flex" }}>
        <DocumentDrawer
          documents={documents}
          selectedDocument={selectedDocument}
          onSelect={selectDocument}
          onCreate={createDocument}
        />
        <main style={{ flexGrow: 1, padding: "1em 2.5em" }}>
          <DocumentDetails
            document={selectedDocument}
            onCreate={createDocument}
            onDelete={deleteDocument}
          />
        </main>
      </div>
    </>
  );
};

const mapStateToProps = ({ documents, selected }) => {
  return {
    documents: Object.values(documents),
    selectedDocument: documents[selected]
  };
};

export default connect(
  mapStateToProps,
  { fetchDocuments, createDocument, deleteDocument, selectDocument }
)(App);
