import * as API from "./../services/index";
import * as types from "./../contanst/index";
import { message } from "antd";
import { products } from "../reducer/producReducer";
import { updateClientReducer } from "./clientAction";

export const getDataProductAsync = (params) => {
  return (dispatch) => {
    API.getDataProducts(params).then((res) => {
      if (res.data && res.data.status) {
        const data = {
          listProduct: res.data.products,
          productPage: {
            totalPage: res.data.totalPage,
            currentPage: res.data.currentPage,
          },
        };
        dispatch(getDataProductReducer(data));
      }
    });
  };
};
export const getDataProductReducer = (products) => {
  return {
    type: types.GET_DATA_PRODUCTS,
    payload: products,
  };
};
export const deleteProduct = (id) => {
  return {
    type: types.DELETE_PRODUCT,
    payload: id,
  };
};
export const deleteProductAsync = (id) => {
  return (dispatch) => {
    API.deleteProduct(id).then((res) => {
      if (res.data && res.data.status) {
        message.success("Xoá thông tin sản phẩm thành công");
        dispatch(deleteProduct(id));
      }
    });
  };
};
export const getDataCategoriesAsync = () => {
  return API.getCategories();
};
export const addProductReducer = (product) => {
  return {
    type: types.ADD_PRODUCT,
    payload: product,
  };
};
export const addProductAsync = (product) => {
  return (dispatch) => {
    API.addProduct(product).then((res) => {
      if (res.data && res.data.status) {
        message.success("Thêm sản phẩm thành công");
        dispatch(addProductReducer(res.data.newProduct));
      } else {
        message.error("Thêm sản phẩm thất bại!");
      }
    });
  };
};
export const updateProductAsync = (product) => {
  return (dispatch) => {
    API.updateProduct(product).then((res) => {
      if (res.data && res.data.status) {
        message.success("Cập nhập thông tin sản phẩm thành công!");
        dispatch(updateProductReducer(res.data.newProduct));
      } else {
        message.error("Update information product faild!");
      }
    });
  };
};
export const updateProductReducer = (product) => {
  return {
    type: types.UPDATE_PRODUCT,
    payload: product,
  };
};
