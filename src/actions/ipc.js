import {
  FETCH_DOCUMENTS
  // CREATE_DOCUMENT,
  // DELETE_DOCUMENT,
  // STORE_DOCUMENT,
  // RETRIEVE_DOCUMENT
} from "./types";

export const fetchDocuments = () => async dispatch => {
  const documents = await window.ipc.callMain("fetchDocuments");

  dispatch({
    type: FETCH_DOCUMENTS,
    payload: documents
  });
};
