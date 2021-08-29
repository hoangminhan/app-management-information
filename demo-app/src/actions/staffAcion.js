import { message } from "antd";
import * as types from "./../contanst/index";
import * as API from "./../services";
export const getDataStaffAsync = (params) => {
  return (dispatch) => {
    API.getDataStaffs(params).then((res) => {
      if (res.data && res.data.status) {
        dispatch(getDataReducer(res.data.staffs));
      }
    });
  };
};
export const getDataReducer = (payload) => {
  return {
    type: types.GET_DATA_STAFF,
    payload,
  };
};
export const addStaffAsync = (staff) => {
  return (dispatch) => {
    API.addStaff(staff)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(addStaffReducer(res.data.staff));
          message.success("Thêm nhân viên thành công!");
        } else {
          message.error("Thêm nhân viên thất bại!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const addStaffReducer = (staff) => {
  return {
    type: types.ADD_STAFF,
    payload: staff,
  };
};
export const deleteStaffReducer = (_id) => {
  return {
    type: types.DELETE_STAFF,
    payload: _id,
  };
};
export const deleteStaffAsync = (_id) => {
  return (dispatch) => {
    API.deleteStaff(_id).then((res) => {
      if (res.data.status) {
        message.success("Xoá thông tin nhân viên thành công!");
        dispatch(deleteStaffReducer(_id));
      }
    });
  };
};
