import axios from "axios";
axios.defaults.baseURL = "https://webmanagement-api.herokuapp.com/api";

// axios.defaults.baseURL = "http://localhost:3999/api";
const callApi = (endpoint, method, data) => {
  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = accessToken;
  return axios({
    method,
    url: endpoint,
    data: data || {},
  });
};
export default callApi;
