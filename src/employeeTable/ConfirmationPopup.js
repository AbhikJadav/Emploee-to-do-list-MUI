import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ConfirmationPopup = ({
  isOpenConfirmation = false,
  handleConfirmation = () => {},
  handleAgreeAction = () => {},
  employeeObj = {},
  isToggle = false,
}) => {
  const { name = "" } = employeeObj;
  return (
    <div>
      <Dialog
        open={isOpenConfirmation}
        onClose={() => handleConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isToggle
            ? "Bulk Employee Status Change"
            : `Delete ${name.toUpperCase()} Employee:`}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleConfirmation(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isToggle
              ? `Are you sure you want to change the status of selected employee?`
              : `Are you sure you want to delete ${name} employee?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmation(false)}>Disagree</Button>
          <Button onClick={() => handleAgreeAction()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationPopup;
