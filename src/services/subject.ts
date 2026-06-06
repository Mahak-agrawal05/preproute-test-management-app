import api from "./api";

export const getSubjects = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/subjects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};