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
export const addClientAsync = (client) => {
  return (dispatch) => {
    API.addClient(client).then((res) => {
      if (res.data && res.data.status) {
        message.success("Thêm khách hàng thành công");
        dispatch(addClientReducer(res.data.newGuest));
      } else {
        message.error("Thêm thất bại");
      }
    });
  };
};
export const addClientReducer = (client) => {
  return {
    type: types.ADD_CLIENT,
    payload: client,
  };
};
export const updateClientReducer = (client) => {
  return {
    type: types.UPDATE_CLIENT,
    payload: client,
  };
};
export const updateClientAsync = (client, id) => {
  return (dispatch) => {
    API.updateClient(client, id).then((res) => {
      if (res.data && res.data.status) {
        dispatch(updateClientReducer(res.data.newGuest));
        message.success(`Cập nhập thông tin của ${client.fullName} thành công`);
      } else {
        message.warn("Cập nhập thông tin khách hàng thất bại");
      }
    });
  };
};
export const purchaseAsync = (product, id, record) => {
  return (dispatch) => {
    API.purchaseProduct(product, id).then((res) => {
      if (res.data.status) {
        message.success("thêm sản phẩm thành công");
        const data = { id: id, record: record };
        dispatch(purchaseReducer(data));
      } else {
        message.error("Thêm sản phẩm thất bại");
      }
    });
  };
};
export const purchaseReducer = (record) => {
  return {
    type: types.ADD_PRODUCT_CLIENT,
    payload: record,
  };
};
