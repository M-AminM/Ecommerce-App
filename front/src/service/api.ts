import axios from "axios";

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      ...params,
    }),

  post: <T>(url: string, data: any) =>
    axios.post<T>(url, data, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }),

  patch: <T>(url: string, data: any) =>
    axios.patch<T>(url, data, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }),

  delete: <T>(url: string) =>
    axios.delete<T>(url, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }),
};
