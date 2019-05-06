import React from "react";
import PropTypes from "prop-types";

import moment from "moment";

import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/SaveAlt";

const DocumentVersion = ({ message, timestamp, versionNumber, onRetrieve }) => {
  const primaryText = message || `(Version ${versionNumber})`;
  const secondaryText = moment(timestamp).calendar();

  return (
    <ListItem>
      <ListItemText primary={primaryText} secondary={secondaryText} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Save" onClick={onRetrieve}>
          <SaveIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const DocumentHistory = ({ document, onRetrieve }) => {
  const { history } = document;

  if (!history) return <CircularProgress />;

  const historyLength = history.length;
  const items = history.map((version, index) => (
    <DocumentVersion
      key={version.id}
      {...version}
      versionNumber={historyLength - index} // history is in reverse chronological order
      onRetrieve={() => onRetrieve(version)}
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
  }),
  onRetrieve: PropTypes.func
};

DocumentHistory.defaultProps = {
  document: {},
  onRetrieve: () => {}
};

export default DocumentHistory;
