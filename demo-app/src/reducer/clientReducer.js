import * as types from "./../contanst/index";
const initialState = {
  listClient: [],
  pageClient: {
    totalPage: "",
    currentPage: "",
  },
};
const clients = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA_CLIENTS:
      console.log(action.payload);
      const { listClient, pageClient } = action.payload;
      let dataChange = listClient.reduce((acc, item, index) => {
        let data = { ...item, stt: index + 1 };
        return [...acc, data];
      }, []);
      return {
        pageClient,
        listClient: dataChange,
      };
    case types.DELETE_CLIENT: {
      const { listClient } = state;
      const newCLients = listClient.filter((item, index) => {
        return item._id !== action.payload;
      });
      return {
        ...state,
        listClient: newCLients,
      };
    }

    default:
      return state;
  }
};
export default clients;
