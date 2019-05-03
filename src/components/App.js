import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchDocuments, createDocument, deleteDocument } from "../actions";
import DocumentList from "./DocumentList";

const App = ({ documents, fetchDocuments, createDocument, deleteDocument }) => {
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <div>
      <h1>Your documents</h1>
      <DocumentList
        documents={documents}
        onCreate={createDocument}
        onDelete={deleteDocument}
      />
    </div>
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
