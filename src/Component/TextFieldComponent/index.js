import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./TextfieldComponent.module.scss";

const TextFieldComponent = ({
  name = "",
  value = "",
  label = "",
  onChange = () => {},
  error = "",
  ...rest
}) => {
  return (
    <div className={styles.formFiledWrapper}>
      <TextField
        required
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        id="filled-required"
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        helperText={error ? error : ""}
        label={label}
        variant="standard"
        {...rest}
      />
    </div>
  );
};

export default TextFieldComponent;
