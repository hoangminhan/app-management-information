import callApi from "../api/axiosClient";

export const login = (data) => {
  return callApi("/login", "POST", data);
};
export const auth = () => {
  return callApi("/auth", "GET", null);
};

// Clients
export const getDataClient = (params) => {
  const { page, search } = params || {};
  const url = `/guests?page=${page || 1}`;
  if (search) {
    url += `&search=${search}`;
  }
  return callApi(url, "GET", null);
};
export const deleteClient = (id) => {
  return callApi(`/guests/${id}`, "DELETE", null);
};
