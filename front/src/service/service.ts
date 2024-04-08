import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useFetch = (url: string | null, params?: object) => {
  const { data, isPending } = useQuery({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
    enabled: !!url,
  });

  return { data, isPending };
};

export const useCreate = () => {
  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: async (props: any) => {
      const { data, url } = props;
      const res = await axios.post(
        `http://localhost:8080/${url}`,
        data
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token1')}`,
        //   },
        // }
      );
      return res;
    },
  });
  return { mutate, isSuccess, isError };
};

export const fetcher = async ({ queryKey }: any) => {
  const [url, params] = queryKey;
  const res = await axios.get(`http://localhost:8080/${url}`, {
    params: params,
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token1')}`,
    //   },
  });
  return res;
};
