const BASE_URL = "/transactions"

const doPayment = (): string => `${BASE_URL}`

export const transactionRoutes = {
  doPayment: () => doPayment(),
}
