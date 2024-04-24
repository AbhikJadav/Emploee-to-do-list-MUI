import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { SET_EMPLOYEE, UPDATE_EMPLOYEE } from "../Store/Action/EmploeeAction";
import { useDispatch } from "react-redux";
import {
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import styles from "./employee.module.scss";
import TextFieldComponent from "../Component/TextFieldComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddEmployee = ({
  isOpendModal = false,
  handleModelClick = () => {},
  employeeObj = {},
  setEmployeeObj = () => {},
  initialEmployeeObj = {},
  isEdit = false,
}) => {
  const dispatch = useDispatch();
  const {
    name = "",
    email = "",
    gender = "",
    dob = "",
    address = "",
    contactNo = "",
    status = false,
  } = employeeObj;
  const initialErrorObj = {
    errName: "",
    errEmail: "",
    errGender: "",
    errDob: "",
    errAddress: "",
    errContactNo: "",
    errStatus: "",
  };
  const [errorObj, setErrorObj] = useState(initialErrorObj);

  const handleEmployeeChange = (event) => {
    const { name, value } = event.target;
    setEmployeeObj({
      ...employeeObj,
      [name]: value,
    });
  };
  const handleDobChange = (event) => {
    setEmployeeObj({
      ...employeeObj,
      dob: dayjs(event).format("DD-MM-YYYY"),
    });
  };
  const validateForm = () => {
    let valid = true;
    const errors = {};
    if (!name.trim()) {
      errors.errName = "Please enter name";
      valid = false;
    }

    if (!email.trim()) {
      errors.errEmail = "Please enter email address";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.errEmail = "Invalid email address";
      valid = false;
    }

    if (!gender.trim()) {
      errors.errGender = "Please select gender";
      valid = false;
    }

    if (!dob.trim()) {
      errors.errDob = "Please enter date of birth";
      valid = false;
    }

    if (!address.trim()) {
      errors.errAddress = "Please enter address";
      valid = false;
    }
    if (!contactNo.trim()) {
      errors.errContactNo = "Please enter contact no";
      valid = false;
    } else if (contactNo.length !== 10) {
      errors.errContactNo = "Please enter 10 digit contact no";
      valid = false;
    }

    setErrorObj(errors);
    return valid;
  };
  const handleAddEmployeeData = () => {
    if (isEdit) {
      dispatch(UPDATE_EMPLOYEE(employeeObj));
      setEmployeeObj(initialEmployeeObj);
      handleModelClick(false);
    } else {
      if (!validateForm()) {
        console.log("errorObj", errorObj);
      } else {
        dispatch(SET_EMPLOYEE({ id: Date.now(), ...employeeObj }));
        setEmployeeObj(initialEmployeeObj);
        handleModelClick(false);
        setErrorObj(initialErrorObj);
      }
    }
  };

  const {
    errName,
    errEmail,
    errGender,
    errDob,
    errAddress,
    errContactNo,
  } = errorObj;

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpendModal}
        onClose={() => handleModelClick(false)}
        TransitionComponent={Transition}
      >
        <div className={styles.formContainer}>
          <form onSubmit={handleAddEmployeeData}>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => handleModelClick(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {isEdit ? "Update Employee" : "Add Employee"}
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={handleAddEmployeeData}
                >
                  {isEdit
                    ? "Click to Update Employee"
                    : "Click to Add Employee"}
                </Button>
              </Toolbar>
            </AppBar>
            <TextFieldComponent
              label="Employee Name"
              name="name"
              value={name}
              error={errName}
              onChange={handleEmployeeChange}
            />

            <TextFieldComponent
              label="Email"
              name="email"
              value={email}
              error={errEmail}
              onChange={handleEmployeeChange}
            />

            <div className={styles.formFiledWrapper}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>

              <RadioGroup
                row
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="gender"
                value={gender}
                onChange={handleEmployeeChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
              {errGender && (
                <FormHelperText error={errGender}>{errGender}</FormHelperText>
              )}
            </div>

            <div className={styles.formFiledWrapper}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    fullWidth
                    required
                    label="Date of Birth"
                    sx={{ mt: 2, mb: 2 }}
                    name="dob"
                    value={dayjs(dob) ? dayjs(dob) : null}
                    onChange={handleDobChange}
                    variant="filled"
                    inputFormat="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>

              {errDob && (
                <FormHelperText error={errDob}>{errDob}</FormHelperText>
              )}
            </div>

            <TextFieldComponent
              label="Address"
              name="address"
              value={address}
              error={errAddress}
              onChange={handleEmployeeChange}
              rows={3}
              multiline={true}
            />

            <TextFieldComponent
              type="number"
              label="Contact No"
              name="contactNo"
              value={contactNo}
              error={errContactNo}
              onChange={handleEmployeeChange}
            />

            <div className={styles.formFiledWrapper}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                required
                fullWidth
                id="demo-simple-select"
                labelId="demo-simple-select-label"
                sx={{ mt: 2, mb: 2 }}
                value={status}
                name="status"
                onChange={handleEmployeeChange}
              >
                <MenuItem value={true}>Completed</MenuItem>
                <MenuItem value={false}>Uncompleted</MenuItem>
              </Select>
            </div>
          </form>

        </div>
      </Dialog>
    </div>
  );
};

export default AddEmployee;
