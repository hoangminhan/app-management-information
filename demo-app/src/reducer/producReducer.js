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
      let { listProduct, productPage } = action.payload;
      let newList = listProduct.reduce((acc, item, index) => {
        return [...acc, { ...item, stt: index + 1 }];
      }, []);
      return { ...state, listProduct: newList, productPage };
    case types.DELETE_PRODUCT: {
      const { listProduct } = state;
      const newList = listProduct.filter((item, index) => {
        return item._id !== action.payload;
      });
      return {
        ...state,
        listProduct: [...newList],
      };
    }
    case types.ADD_PRODUCT: {
      return {
        ...state,
        listProduct: [...state.listProduct, action.payload],
      };
    }
    case types.UPDATE_PRODUCT: {
      let { listProduct } = state;
      const products = [...listProduct];
      products.forEach((item, index) => {
        if (item._id === action.payload._id) {
          products[index] = {
            ...action.payload,
            stt: index + 1,
            category: products[index].category,
          };
        }
      });
      return {
        ...state,
        listProduct: [...products],
      };
    }
    default:
      return state;
  }
};
