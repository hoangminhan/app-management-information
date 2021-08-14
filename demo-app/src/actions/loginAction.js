// import callApi from "../api/axiosClient";
import * as API from "./../services/index";
import * as types from "./../contanst/index";

export const loginReducer = (data) => {
  return {
    type: types.GET_DATA_lOGIN,
    payload: data,
  };
};
export const authAsync = () => {
  return (dispatch) => {
    API.auth().then((res) => {
      if (res.data && res.data.status) {
      }
      dispatch(auth(res.data.user));
    });
  };
};
export const auth = (payload) => {
  return {
    type: types.AUTHORIZATION_USER,
    payload,
  };
};
export const logOut = () => {
  return {
    type: types.LOGOUT,
  };
};
