import api from "./api";

export const getFoods = async () => {
  try {
    const res = await api.get("/foods");
    return res.data;
  } catch (err) {
    console.error("Error fetching foods:", err);
    throw err;
  }
};