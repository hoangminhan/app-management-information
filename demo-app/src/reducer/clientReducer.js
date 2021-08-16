import * as types from "./../contanst/index";
const initialState = {
  listClient: [],
  clientPage: {
    totalPage: "",
    currentPage: "",
  },
  location: [
    {
      id: 1,
      name: "Quận 12",
    },
    {
      id: 2,
      name: "Quận Thủ Đức",
    },
    {
      id: 3,
      name: "Quận 9",
    },
    {
      id: 4,
      name: "Quận Gò Vấp",
    },
    {
      id: 5,
      name: "Quận Bình Thạnh",
    },
    {
      id: 6,
      name: "Quận Tân Bình",
    },
    {
      id: 7,
      name: "Quận Tân Phú",
    },
    {
      id: 8,
      name: "Quận Phú Nhuận",
    },
    {
      id: 9,
      name: "Quận 2",
    },
    {
      id: 10,
      name: "Quận 3",
    },
    {
      id: 11,
      name: "Quận 10",
    },
    {
      id: 12,
      name: "Quận 11",
    },
    {
      id: 13,
      name: "Quận 4",
    },
    {
      id: 14,
      name: "Quận 5",
    },
    {
      id: 15,
      name: "Quận 6",
    },
    {
      id: 16,
      name: "Quận 8",
    },
    {
      id: 17,
      name: "Quận Bình Tân",
    },
    {
      id: 18,
      name: "Quận 7",
    },
    {
      id: 19,
      name: "Huyện Củ Chi",
    },
    {
      id: 20,
      name: "Huyện Hóc Môn",
    },
    {
      id: 21,
      name: "Huyện Bình Chánh",
    },
    {
      id: 22,
      name: "Huyện Nhà Bè",
    },
    {
      id: 23,
      name: "Huyện Cần Giờ",
    },
    {
      id: 24,
      name: "Quận 1",
    },
  ],
};
const clients = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA_CLIENTS:
      const { listClient, clientPage } = action.payload;
      let dataChange = listClient.reduce((acc, item, index) => {
        let data = { ...item, stt: index + 1 };
        return [...acc, data];
      }, []);
      return {
        ...state,
        clientPage,
        listClient: [...dataChange],
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
    case types.ADD_CLIENT: {
      return {
        ...state,
        listClient: [...state.listClient, action.payload],
      };
    }
    case types.UPDATE_CLIENT: {
      let { listClient } = state;
      let newListClient = [...listClient];
      newListClient.forEach((item, index) => {
        if (item._id === action.payload._id) {
          newListClient[index] = { ...action.payload, stt: index + 1 };
        }
      });
      return {
        ...state,
        listClient: [...newListClient],
      };
    }
    default:
      return state;
  }
};
export default clients;
