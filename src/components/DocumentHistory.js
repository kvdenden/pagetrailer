import React from "react";
import PropTypes from "prop-types";

import moment from "moment";

import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/SaveAlt";

const DocumentVersion = ({ message, timestamp, versionNumber }) => {
  const primaryText = message || `(Version ${versionNumber})`;
  const secondaryText = moment(timestamp).calendar();

  return (
    <ListItem>
      <ListItemText primary={primaryText} secondary={secondaryText} />
      <ListItemSecondaryAction>
        <SaveIcon />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const DocumentHistory = ({ document }) => {
  const { history } = document;

  if (!history) return <CircularProgress />;

  const historyLength = history.length;
  const items = history.map((version, index) => (
    <DocumentVersion
      key={version.id}
      {...version}
      versionNumber={historyLength - index} // history is in reverse chronological order
    />
  ));
  return <List>{items}</List>;
};

DocumentHistory.propTypes = {
  document: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        message: PropTypes.string,
        timestamp: PropTypes.number
      })
    )
  })
};

DocumentHistory.defaultProps = {
  document: {}
};

export default DocumentHistory;
