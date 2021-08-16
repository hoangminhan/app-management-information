import * as API from "./../services/index";
import * as types from "./../contanst/index";

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
