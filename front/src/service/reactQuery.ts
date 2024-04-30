import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

interface FetchInterface<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

export const fetcher: any = async <T>({ queryKey }: any): Promise<T> => {
  const [url, params] = queryKey;
  const res = await api.get<T>(`http://localhost:8080/${url}`, {
    params: { ...params },
  });
  return res.data;
};

export const useFetch = <T>(url: string | null, params?: object) => {
  const { data, isPending, isError, isSuccess, refetch, error } = useQuery<
    FetchInterface<T>
  >({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
    enabled: !!url,
  });

  return { data, isPending, isError, isSuccess, refetch, error };
};

export const usePost = <T, S>(url: string) => {
  const client = useQueryClient();
  const { mutate, isSuccess, isError, data } = useMutation({
    mutationFn: (data: S) => {
      return api.post<T>(`http://localhost:8080/${url}`, data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [url] });
    },
  });

  return { mutate, isSuccess, isError, data };
};

// https://github.com/horprogs/react-query/blob/master/src/utils/reactQuery.ts
