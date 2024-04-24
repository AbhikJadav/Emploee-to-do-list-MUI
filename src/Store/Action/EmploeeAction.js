import { EMPLOYEE_TYPE } from "../Type";

export const SET_EMPLOYEE = (payload) => ({
  type: EMPLOYEE_TYPE.ADD_EMPLOYEE,
  payload,
});
export const DELETE_EMPLOYEE = (payload) => ({
  type: EMPLOYEE_TYPE.DELETE_EMPLOYEE,
  payload,
});
export const UPDATE_EMPLOYEE = (payload) => ({
  type: EMPLOYEE_TYPE.UPDATE_EMPLOYEE,
  payload,
});
export const SET_STATUS_EMPLOYEE = (payload) => ({
  type: EMPLOYEE_TYPE.STATUS_EMPLOYEE,
  payload,
});
