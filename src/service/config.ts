import Axios, { type AxiosRequestHeaders } from "axios"

export const axiosInstance = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export const service = {
  get: async (url: string, headers?: AxiosRequestHeaders) => {
    return await axiosInstance
      .get(url, {
        headers,
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw new Error(`${error}`)
      })
  },
  post: async (url: string, data: any, headers?: any) => {
    return await axiosInstance
      .post(url, data, {
        headers,
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw new Error(`${error}`)
      })
  },
  put: async (url: string, data: any, headers?: any) => {
    return await axiosInstance
      .put(url, data, {
        headers,
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw new Error(`${error}`)
      })
  },
  delete: async (url: string, headers?: AxiosRequestHeaders) => {
    return await axiosInstance
      .delete(url, {
        headers,
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw new Error(`${error}`)
      })
  },
}
