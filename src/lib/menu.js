import api from "./api";

export async function getMenu() {
  const response = await api.get("/menu");

  // backend returns { success, message, data }
  return response.data.data;
}