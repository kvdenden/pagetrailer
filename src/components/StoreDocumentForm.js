import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, FormControl, TextField } from "@material-ui/core";

const StoreDocumentForm = ({ file, onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ file, message });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="File"
          defaultValue={file.name}
          InputProps={{
            readOnly: true
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Message"
          value={message}
          onChange={event => setMessage(event.target.value)}
          placeholder="What is new in this version?"
          autoFocus
        />
      </FormControl>
      <FormControl fullWidth style={{ marginTop: "1em" }}>
        <Button variant="contained" color="primary" type="submit">
          Store
        </Button>
      </FormControl>
    </form>
  );
};

StoreDocumentForm.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string
  }),
  onSubmit: PropTypes.func
};

StoreDocumentForm.defaultProps = {
  file: {},
  onSubmit: () => {}
};

export default StoreDocumentForm;
