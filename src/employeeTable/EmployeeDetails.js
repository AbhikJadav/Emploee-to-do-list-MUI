import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./employee.module.scss";

import {
  DeleteRounded as DeleteIcon,
  CreateRounded as CreateIcon,
} from "@mui/icons-material";
import TooltipComponent from "../Component/TooltipComponent";

const EmployeeDetails = ({
  employeeData = [],
  setToggleData = () => {},
  handleDeleteEmployee = () => {},
  handleEditEmployee = () => {},
}) => {
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "dob", headerName: "Date Of Birth", width: 200 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "contactNo", headerName: "Contact No", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (rowData) => {
        const { status } = rowData?.row;
        return <div>{status ? "Completed" : "Uncompleted"}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 0,
      renderCell: (rowData) => {
        return (
          <div className={styles.actionButtonWrapper}>
            <TooltipComponent
              title="Delete"
              content={
                <DeleteIcon
                  className={styles.deleteBtnWrapper}
                  onClick={() => handleDeleteEmployee(rowData)}
                />
              }
              placement="top"
            />
            <TooltipComponent
              title="Edit"
              content={
                <CreateIcon
                  className={styles.editBtnWrapper}
                  onClick={() => handleEditEmployee(rowData)}
                />
              }
              placement="top"
            />
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={employeeData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        isRowSelectable={(params) => !params.row.status}
        onRowSelectionModelChange={(rowSelection) => {
          setToggleData(rowSelection);
        }}
        autoHeight
      />
    </div>
  );
};

export default EmployeeDetails;
