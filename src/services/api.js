import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getContacts = () => api.get("/contacts");
export const addContact = (data) => api.post("/contacts", data);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);
export const updateContact = (id, data) => api.put(`/contacts/${id}`, data);
export default api;
