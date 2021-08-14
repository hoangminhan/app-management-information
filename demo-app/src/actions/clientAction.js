import * as API from "./../services/index";
import * as types from "./../contanst/index";
import { message } from "antd";

export const getDataClientAsync = (params) => {
  return (dispatch) => {
    API.getDataClient(params).then((res) => {
      if (res.data && res.data.status) {
        const data = {
          listClient: res.data.guests,
          clientPage: {
            totalPage: res.data.totalGuests,
            currentPage: res.data.currentPage,
          },
        };
        dispatch(getAllClient(data));
      }
    });
  };
};
export const getAllClient = (payload) => {
  return {
    type: types.GET_DATA_CLIENTS,
    payload,
  };
};
export const deleteClient = (id) => {
  return {
    type: types.DELETE_CLIENT,
    payload: id,
  };
};
export const deleteClientAsync = (id) => {
  return (dispatch) => {
    console.log(dispatch);
    API.deleteClient(id).then((res) => {
      if (res.data.status) {
        message.success("Xoá thông tin khách hàng thành công!");
        dispatch(deleteClient(id));
      }
    });
  };
};
