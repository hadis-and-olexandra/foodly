import api from "./api";

export const getProfile = async () => {
  const res = await api.get("/customers/profile"); 
  return res.data.user;
};