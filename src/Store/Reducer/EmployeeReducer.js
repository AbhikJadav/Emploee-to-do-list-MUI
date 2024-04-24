import { EMPLOYEE_TYPE } from "../Type";

const initialState = {
  employeeData: [],
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_TYPE.ADD_EMPLOYEE:
      return {
        ...state,
        employeeData: [...state.employeeData, action.payload],
      };
    case EMPLOYEE_TYPE.DELETE_EMPLOYEE:
      return {
        ...state,
        employeeData: state.employeeData.filter(
          (element) => element.id !== action.payload
        ),
      };
    case EMPLOYEE_TYPE.UPDATE_EMPLOYEE:
      const updatedEmployee = state.employeeData.map((element) =>
        element.id === action.payload.id ? action.payload : element
      );
      return {
        ...state,
        employeeData: updatedEmployee,
      };
    case EMPLOYEE_TYPE.STATUS_EMPLOYEE:
      const updatedToggle = state.employeeData.map((element) => {
        if (action.payload.includes(element.id)) {
          return { ...element, status: !element.status };
        }
        return element;
      });
      return {
        ...state,
        employeeData: updatedToggle,
      };

    default:
      return state;
  }
};

export default EmployeeReducer;
