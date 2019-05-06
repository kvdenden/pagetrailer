import React, { useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import {
  deleteDocument,
  fetchHistory,
  storeDocument,
  retrieveDocument
} from "../actions";

import DocumentDetails from "./DocumentDetails";

const MainContainer = styled.main`
  flex-grow: 1;
  padding: 1em 2.5em;
`;

const MainContent = ({
  document,
  deleteDocument,
  fetchHistory,
  storeDocument,
  retrieveDocument
}) => {
  useEffect(() => {
    if (document && !document.history) {
      fetchHistory(document);
    }
  }, [document, fetchHistory]);

  return (
    <MainContainer>
      <DocumentDetails
        document={document}
        onStore={({ file, message }) => storeDocument(document, file, message)}
        onRetrieve={version => retrieveDocument(document, version.id)}
        onDelete={() => deleteDocument(document)}
      />
    </MainContainer>
  );
};

const mapStateToProps = ({ documents, selected }) => {
  return {
    document: documents[selected]
  };
};

export default connect(
  mapStateToProps,
  { deleteDocument, fetchHistory, storeDocument, retrieveDocument }
)(MainContent);
