const BASE_URL = '/users'
const getUser = (id: string) => `${BASE_URL}/${id}`;
const register = () => `${BASE_URL}`;
export const userRoutes = {
  getUser: (id: string) => getUser(id),
  register: () => register(),
}