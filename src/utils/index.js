import axios from "axios";
export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  return userRoles.includes("admin");
};

export const api = axios.create({ baseURL: "http://localhost:5001/" });
