import React, { useState } from "react";
import PropTypes from "prop-types";

import { TextField, Button, FormControl } from "@material-ui/core";

const DocumentForm = ({ submitText, onSubmit }) => {
  const [values, setValues] = useState({
    title: "",
    description: ""
  });

  const onChange = attribute => event => {
    setValues({ ...values, [attribute]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Title"
          value={values.title}
          onChange={onChange("title")}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Description"
          value={values.description}
          onChange={onChange("description")}
        />
      </FormControl>
      <FormControl fullWidth style={{ marginTop: "1em" }}>
        <Button variant="contained" color="primary" type="submit">
          {submitText}
        </Button>
      </FormControl>
    </form>
  );
};

DocumentForm.propTypes = {
  onSubmit: PropTypes.func,
  submitText: PropTypes.string
};

DocumentForm.defaultProps = {
  onSubmit: () => {},
  submitText: "Create"
};

export default DocumentForm;
