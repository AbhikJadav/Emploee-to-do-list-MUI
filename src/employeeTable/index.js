import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEmployee from "./AddEmployee";
import {
  DELETE_EMPLOYEE,
  SET_STATUS_EMPLOYEE,
} from "../Store/Action/EmploeeAction";
import styles from "./employee.module.scss";
import ConfirmationPopup from "./ConfirmationPopup";
import EmployeeDetails from "./EmployeeDetails";

const EmployeeTable = () => {
  
  const dispatch = useDispatch();
  const employeeSelector = useSelector((state) => state.employeeReducer);
  const { employeeData = [] } = employeeSelector;
  const [isOpendModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const initialEmployeeObj = {
    name: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    contactNo: "",
    status: false,
  };
  const [employeeObj, setEmployeeObj] = useState(initialEmployeeObj);
  const [isToggle, setIsToggle] = useState(false);

  const handleModelClick = (value) => {
    setIsOpenModal(value);
    setIsEdit(false);
  };
  const handleDeleteEmployee = (rowData) => {
    handleConfirmation(true);
    setEmployeeObj(rowData.row);
  };
  const handleEditEmployee = (rowData) => {
    setEmployeeObj(rowData.row);
    handleModelClick(true);
    setIsEdit(true);
  };

  const [toggleData, setToggleData] = useState([]);

  const handleConfirmation = (value) => {
    setIsOpenConfirmation(value);
    setIsToggle(false);
  };
  const handleAgreeAction = () => {
    if (isToggle) {
      dispatch(SET_STATUS_EMPLOYEE(toggleData));
    } else {
      dispatch(DELETE_EMPLOYEE(employeeObj.id));
    }
    handleConfirmation(false);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <div className={styles.headerBtnWrapper}>
        <Button
          onClick={() => {
            handleConfirmation(true);
            setIsToggle(true);
          }}
          variant="contained"
          disabled={!toggleData?.length}
        >
          Employee Status Change
        </Button>
        <Button onClick={() => handleModelClick(true)} variant="outlined">
          Add Employee
        </Button>
      </div>
      <div style={{ width: "100%" }}>
        <EmployeeDetails
          employeeData={employeeData}
          setToggleData={setToggleData}
          handleDeleteEmployee={handleDeleteEmployee}
          handleEditEmployee={handleEditEmployee}
        />
      </div>
      {isOpendModal ? (
        <AddEmployee
          isOpendModal={isOpendModal}
          handleModelClick={handleModelClick}
          employeeObj={employeeObj}
          setEmployeeObj={setEmployeeObj}
          initialEmployeeObj={initialEmployeeObj}
          isEdit={isEdit}
        />
      ) : (
        <></>
      )}
      {isOpenConfirmation ? (
        <ConfirmationPopup
          isOpenConfirmation={isOpenConfirmation}
          handleConfirmation={handleConfirmation}
          handleAgreeAction={handleAgreeAction}
          employeeObj={employeeObj}
          isToggle={isToggle}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default EmployeeTable;
