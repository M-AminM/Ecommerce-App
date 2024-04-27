import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useFetch = (url: string | null, params?: object) => {
  const { data, isPending, isError, isSuccess, refetch } = useQuery({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
    enabled: !!url,
  });

  return { data, isPending, isError, isSuccess, refetch };
};

export const useCreate = () => {
  const { mutate, isSuccess, isError, data } = useMutation({
    mutationFn: async (props: any) => {
      const { data, url } = props;
      const res = await axios.post(`http://localhost:8080/${url}`, data, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return res;
    },
  });
  return { mutate, isSuccess, isError, data };
};

export const fetcher = async ({ queryKey }: any) => {
  const [url, params] = queryKey;
  const res = await axios.get(`http://localhost:8080/${url}`, {
    params: params,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return res;
};
