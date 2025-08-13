import axios from "axios";

const API_BASE = "http://localhost:3000/auction";

export const getUsers = () => axios.get(`${API_BASE}/user`);
export const getUserById = (id) => axios.get(`${API_BASE}/user/${id}`);

// export const createItem = (item) => axios.post(`${API_BASE}/item`, item);
export const createItem = (item) =>
  axios.post(`${API_BASE}/item`, item, {
    headers: { "Content-Type": "application/json" }
  });

export const getItemsPaginated = () => axios.get(`${API_BASE}/item/paginated`);
export const getActiveItemsPaginated = () => axios.get(`${API_BASE}/item/active/paginated`);
// export const getItemById = (id) => axios.get(`${API_BASE}/item/${id}/bids`);
export const getItemById = async (id) => {
  const res = await axios.get("/auction/item/active/paginated");
  return res.data.items.find(item => item.id === id);
};
export const getActiveItems = () => axios.get(`${API_BASE}/item/active/paginated`);

export const placeBid = (itemId, bid) =>
  axios.post(`${API_BASE}/item/${itemId}/bid`, bid);

export const getBidsForItem = (itemId) =>
  axios.get(`${API_BASE}/item/${itemId}/bids`);

