import callApi from "../api/axiosClient";

export const login = (data) => {
  return callApi("/login", "POST", data);
};
export const auth = () => {
  return callApi("/auth", "GET", null);
};

// Clients
export const getDataClient = (params) => {
  const { page, search, start, end } = params || {};
  let url = `/guests?page=${page || 1}`;
  if (search) {
    url += `&search=${search}`;
  }
  if (start) {
    url += `&start=${start}`;
  }
  if (end) {
    url += `&end=${end}`;
  }
  return callApi(url, "GET", null);
};
export const deleteClient = (id) => {
  return callApi(`/guests/${id}`, "DELETE", null);
};
export const addClient = (client) => {
  return callApi("/guests", "POST", client);
};
export const updateClient = (client, id) => {
  return callApi(`/guests/${id}`, "PUT", client);
};

export const getDataProducts = (params) => {
  const { page, search } = params || {};
  let url = `/products?page=${page || 1}`;
  if (search) {
    url += `&search=${search}`;
  }
  return callApi(url);
};
