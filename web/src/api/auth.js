import { GET, POST } from "./utils";
import { queryClient } from "../main";

export const login = async (email, password) => {
  return await POST("/api/auth/login", { email, password });
};

export const register = async (username, email, password) => {
  return await POST("/api/auth/register", { username, email, password });
}

export const logout = async () => {
  return await GET("/api/auth/logout");
};

export const isAuthenticated = async () => {
  const login = async () => {
    return await GET("/api/user/me");
  };

  try {
    await queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: login,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
