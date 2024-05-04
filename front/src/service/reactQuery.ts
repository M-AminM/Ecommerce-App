import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "./interceptor";
import { useRef } from "react";

interface FetchInterface<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

export const fetcher = async <T>({
  queryKey,
}: any): Promise<FetchInterface<T>> => {
  const [url, params] = queryKey;
  const res = await instance.get<FetchInterface<T>>(url, {
    params: { ...params },
  });

  return res.data;
};

export const useFetch = <T>(url: string | null, params?: object) => {
  const { data, isPending, isError, isSuccess, refetch, error } = useQuery<
    FetchInterface<T>
  >({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher<T>({ queryKey }),
    enabled: !!url,
  });

  return {
    data,
    isPending,
    isError,
    isSuccess,
    refetch,
    error,
  };
};

export const usePost = <T, S>(url: string) => {
  const client = useQueryClient();
  const { mutate, isSuccess, isError, data, isPending } = useMutation({
    mutationFn: (data: S) => {
      return instance.post<FetchInterface<T>>(url, data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [url] });
    },
  });

  return { mutate, isSuccess, isError, data, isPending };
};

export const useDelete = (url: string) => {
  const client = useQueryClient();
  const { isPending, mutate, mutateAsync, isSuccess, isError } = useMutation({
    mutationKey: [`delete/${url}`],
    mutationFn: (id) => {
      return instance.delete(`${url}/${id}`);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [url] });
    },
  });

  return { mutate, mutateAsync, isPending, isSuccess, isError };
};

// https://github.com/horprogs/react-query/blob/master/src/utils/reactQuery.ts

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { api } from "./api";
// import axiosInstance from "./axios";
// import { toast } from "react-toastify";

// interface FetchInterface<T> {
//   isSuccess: boolean;
//   message: string;
//   data: T;
// }

// export const fetcher = async <T>({
//   queryKey,
// }: any): Promise<FetchInterface<T>> => {
//   const [url, params] = queryKey;
//   // const res = await api.get<FetchInterface<T>>(`http://localhost:8080/${url}`, {
//   //   params: { ...params },
//   // });
//   try {
//     const res = await axiosInstance.get<FetchInterface<T>>(url, {
//       params: { ...params },
//       headers: {
//         Authorization: `${localStorage.getItem("token")}`,
//       },
//     });
//     return res.data;
//   } catch (err) {
//     toast.error("Access is denied due to invalid credentials");
//     setTimeout(() => {
//       localStorage.clear();
//       window.location.href = "http://localhost:3000/login";
//     }, 1000);
//     throw err;
//   }
// };

// export const useFetch = <T>(url: string | null, params?: object) => {
//   const { data, isPending, isError, isSuccess, refetch, error } = useQuery<
//     FetchInterface<T>
//   >({
//     queryKey: [url!, params],
//     queryFn: ({ queryKey }) => fetcher<T>({ queryKey }),
//     enabled: !!url,
//   });

//   console.log(error);

//   return {
//     data,
//     isPending,
//     isError,
//     isSuccess,
//     refetch,
//     error,
//   };
// };

// export const usePost = <T, S>(url: string) => {
//   const client = useQueryClient();
//   const { mutate, isSuccess, isError, data } = useMutation({
//     mutationFn: (data: S) => {
//       return api.post<FetchInterface<T>>(`http://localhost:8080/${url}`, data);
//     },
//     onSuccess: () => {
//       client.invalidateQueries({ queryKey: [url] });
//     },
//   });
//   console.log(data);

//   return { mutate, isSuccess, isError, data };
// };

// // https://github.com/horprogs/react-query/blob/master/src/utils/reactQuery.ts
