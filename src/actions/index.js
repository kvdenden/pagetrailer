import { SELECT_DOCUMENT } from "./types";

export const selectDocument = ({ key }) => {
  return {
    type: SELECT_DOCUMENT,
    payload: key
  };
};

export * from "./ipc";
