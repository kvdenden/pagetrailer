import React, { useEffect } from "react";
import { connect } from "react-redux";

import { CssBaseline } from "@material-ui/core";

import styled from "styled-components";

import { fetchDocuments, selectDocument } from "../actions";

import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Container = styled.div`
  display: flex;
`;

const App = ({ documents, selected, fetchDocuments, selectDocument }) => {
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    const [firstDocument] = Object.values(documents);
    if (!selected && firstDocument) {
      selectDocument(firstDocument);
    }
  }, [selected, documents, selectDocument]);

  return (
    <>
      <CssBaseline />
      <Container>
        <Sidebar />
        <MainContent />
      </Container>
    </>
  );
};

const mapStateToProps = ({ documents, selected }) => {
  return { documents, selected };
};

export default connect(
  mapStateToProps,
  { fetchDocuments, selectDocument }
)(App);
