import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { CssBaseline } from "@material-ui/core";

import { fetchDocuments, createDocument, deleteDocument } from "../actions";
import DocumentDrawer from "./DocumentDrawer";
import DocumentDetails from "./DocumentDetails";

const App = ({ documents, fetchDocuments, createDocument, deleteDocument }) => {
  const [document, selectDocument] = useState();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    selectDocument(documents[0]);
  }, [documents]);

  return (
    <>
      <CssBaseline />
      <div style={{ display: "flex" }}>
        <DocumentDrawer
          documents={documents}
          onSelect={selectDocument}
          onCreate={createDocument}
        />
        <main style={{ flexGrow: 1, padding: "1em 2.5em" }}>
          <DocumentDetails
            document={document}
            onCreate={createDocument}
            onDelete={deleteDocument}
          />
        </main>
      </div>
    </>
  );
};

const mapStateToProps = ({ documents }) => {
  return {
    documents: Object.values(documents)
  };
};

export default connect(
  mapStateToProps,
  { fetchDocuments, createDocument, deleteDocument }
)(App);
