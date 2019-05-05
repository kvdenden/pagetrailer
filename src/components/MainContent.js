import React, { useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import { deleteDocument, fetchHistory } from "../actions";

import DocumentDetails from "./DocumentDetails";

const MainContainer = styled.main`
  flex-grow: 1;
  padding: 1em 2.5em;
`;

const MainContent = ({ document, deleteDocument, fetchHistory }) => {
  useEffect(() => {
    if (document && !document.history) {
      fetchHistory(document);
    }
  }, [document, fetchHistory]);

  return (
    <MainContainer>
      <DocumentDetails
        document={document}
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
  { deleteDocument, fetchHistory }
)(MainContent);
