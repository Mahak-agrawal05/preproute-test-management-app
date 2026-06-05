import api from "./api";

export const login = async (
  userId: string,
  password: string
) => {
  const response = await api.post("/auth/login", {
    userId,
    password,
  });

  return response.data;
};