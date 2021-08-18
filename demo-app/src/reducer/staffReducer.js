import * as types from "./../contanst/index";
const initialState = {
  listStaff: [],
};
const staffs = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA_STAFF: {
      const newStaffs = action.payload.reduce((acc, item, index) => {
        return [
          ...acc,
          {
            ...item,
            stt: index + 1,
            infor: {
              address: item.address,
              username: item.username,
              email: item.email,
              phone: item.phone,
            },
          },
        ];
      }, []);
      return {
        ...state,
        listStaff: [...newStaffs],
      };
    }
    case types.ADD_STAFF: {
      const { listStaff } = state;
      return {
        ...state,
        listStaff: [
          ...listStaff,
          {
            ...action.payload,
            infor: {
              address: action.payload.address,
              username: action.payload.username,
              email: action.payload.email,
              phone: action.payload.phone,
            },
            stt: listStaff.length + 1,
          },
        ],
      };
    }
    case types.DELETE_STAFF: {
      const { listStaff } = state;
      // const newList = [...listStaff]
      const newList = listStaff.filter((item) => {
        return item._id !== action.payload;
      });
      const updateList = newList.reduce((acc, item, index) => {
        return [
          ...acc,
          {
            ...item,
            stt: index + 1,
            infor: {
              address: item.address,
              username: item.username,
              email: item.email,
              phone: item.phone,
            },
          },
        ];
      }, []);
      return {
        ...state,
        listStaff: updateList,
      };
    }
    default:
      return state;
  }
};
export default staffs;
