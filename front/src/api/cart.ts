import { CartInterface } from "../interfaces/cart";
import { apiRoutes } from "../routes/apiRoutes";
import { useFetch } from "../service/reactQuery";

export const useGetCart = (params?: object) =>
  useFetch<CartInterface[]>(apiRoutes.getCart, params);
