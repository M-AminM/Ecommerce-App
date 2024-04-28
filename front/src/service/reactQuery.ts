import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "./api";

interface FetchInterface<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

export const fetcher: any = async <T>({
  queryKey, //   pageParam,
}: any): Promise<T> => {
  const [url, params] = queryKey;
  const res = await api.get<T>(`http://localhost:8080/${url}`, {
    params: { ...params },
  });
  return res.data;
};

export const useFetch = <T>(
  url: string | null,
  params?: object
  // config?: UseQueryOptions<T, Error, T, any>
) => {
  const { data, isPending, isError, isSuccess, refetch } = useQuery<
    FetchInterface<T>
  >({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
    enabled: !!url,
    // ...config,
  });

  return { data, isPending, isError, isSuccess, refetch };
};

// https://github.com/horprogs/react-query/blob/master/src/utils/reactQuery.ts
