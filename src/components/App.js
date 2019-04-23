import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchDocuments } from "../actions";
import DocumentList from "./DocumentList";

const App = ({ documents, fetchDocuments }) => {
  useEffect(() => {
    fetchDocuments();
  }, []);
  return (
    <div>
      <h1>Your documents</h1>
      <DocumentList documents={documents} />
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
  { fetchDocuments }
)(App);
