const BASE_URL = "/users";
const register = () => `${BASE_URL}`;
const updateUser = (userId: string) => `${BASE_URL}/?userId=${userId}`;
const deleteUser = (userId: string) => `${BASE_URL}/?userId=${userId}`;
const loginUser = () => `${BASE_URL}/login`;
const getUserData = (userId: string) => `${BASE_URL}/${userId}`;
export const userRoutes = {
  register: () => register(),
  updateUser: (userId: string) => updateUser(userId),
  deleteUser: (userId: string) => deleteUser(userId),
  loginUser: () => loginUser(),
  getUserData: (userId: string) => getUserData(userId),
};
