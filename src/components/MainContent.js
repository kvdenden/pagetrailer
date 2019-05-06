import React, { useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import { deleteDocument, fetchHistory, storeDocument } from "../actions";

import DocumentDetails from "./DocumentDetails";

const MainContainer = styled.main`
  flex-grow: 1;
  padding: 1em 2.5em;
`;

const MainContent = ({
  document,
  deleteDocument,
  fetchHistory,
  storeDocument
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
  { deleteDocument, fetchHistory, storeDocument }
)(MainContent);
