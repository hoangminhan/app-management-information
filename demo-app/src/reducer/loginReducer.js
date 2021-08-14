import * as types from "./../contanst/index";

const initialState = {
  loginStatus: false,
  user: {
    address: "",
    email: "",
    fullName: "",
    image: "",
    password: "",
    phone: "",
    role: "",
    _id: "",
    text: "",
    username: "",
  },
};
const login = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA_lOGIN: {
      console.log(action.payload);
      const {
        address,
        email,
        fullName,
        image,
        password,
        phone,
        role,
        _id,
        text,
        username,
      } = action.payload;

      return {
        ...state,
        loginStatus: true,
        user: {
          ...state.user,
          address,
          email,
          fullName,
          image,
          password,
          phone,
          role,
          _id,
          text,
          username,
        },
      };
    }
    case types.AUTHORIZATION_USER:
      const {
        address,
        email,
        fullName,
        image,
        password,
        phone,
        role,
        _id,
        text,
        username,
      } = action.payload;
      return {
        ...state,
        loginStatus: true,
        user: {
          ...state.user,
          address,
          email,
          fullName,
          image,
          password,
          phone,
          role,
          _id,
          text,
          username,
        },
      };
    case types.LOGOUT:
      return {
        ...state,
        loginStatus: false,
        user: {
          address: "",
          email: "",
          fullName: "",
          image: "",
          password: "",
          phone: "",
          role: "",
          _id: "",
          text: "",
          username: "",
        },
      };
    default:
      return state;
  }
};
export default login;
