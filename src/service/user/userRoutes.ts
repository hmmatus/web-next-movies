const BASE_URL = "/users"
const getUser = (id: string): string => `${BASE_URL}/${id}`
const register = (): string => `${BASE_URL}`
export const userRoutes = {
  getUser: (id: string) => getUser(id),
  register: () => register(),
}
