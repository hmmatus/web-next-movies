const BASE_URL = '/users'
const getUser = (id: string) => `${BASE_URL}/${id}`;
export const userRoutes = {
  getUser: (id: string) => getUser(id),
}