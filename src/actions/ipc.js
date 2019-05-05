import {
  FETCH_DOCUMENTS,
  CREATE_DOCUMENT,
  DELETE_DOCUMENT,
  FETCH_DOCUMENT_HISTORY
  // STORE_DOCUMENT,
  // RETRIEVE_DOCUMENT
} from "./types";

export const fetchDocuments = () => async dispatch => {
  window.ipc.once("fetchDocuments", (_, documents) => {
    dispatch({
      type: FETCH_DOCUMENTS,
      payload: documents
    });
  });

  window.ipc.send("fetchDocuments");
};

export const createDocument = ({ title, description }) => async dispatch => {
  window.ipc.once("createDocument", (_, document) => {
    dispatch({
      type: CREATE_DOCUMENT,
      payload: document
    });
  });

  window.ipc.send("createDocument", {
    title,
    description
  });
};

export const deleteDocument = ({ key }) => async dispatch => {
  window.ipc.once("deleteDocument", (_, key) => {
    dispatch({
      type: DELETE_DOCUMENT,
      payload: key
    });
  });

  window.ipc.send("deleteDocument", key);
};

export const fetchHistory = ({ key }) => async dispatch => {
  window.ipc.once("fetchHistory", (_, history) => {
    dispatch({
      type: FETCH_DOCUMENT_HISTORY,
      payload: { key, history }
    });
  });

  window.ipc.send("fetchHistory", key);
};
