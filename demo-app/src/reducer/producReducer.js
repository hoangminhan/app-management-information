import * as types from "./../contanst/index";
const initialState = {
  listProduct: [],
  productPage: {
    totalPage: "",
    currentPage: "",
  },
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA_PRODUCTS:
      console.log(action.payload);
      let { listProduct, productPage } = action.payload;
      let newList = listProduct.reduce((acc, item, index) => {
        return [...acc, { ...item, stt: index + 1 }];
      }, []);
      return { ...state, listProduct: newList, productPage };
    default:
      return state;
  }
};
