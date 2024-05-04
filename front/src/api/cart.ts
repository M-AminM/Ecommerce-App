import {
  CartInterface,
  CartPostInterface,
  CartResInterface,
} from "../interfaces/cart";
import { apiRoutes } from "../routes/apiRoutes";
import { useDelete, useFetch, usePost } from "../service/reactQuery";

export const useGetCart = (params?: object) =>
  useFetch<CartInterface[]>(apiRoutes.getCart, params);

export const usePostCart = () => {
  return usePost<CartResInterface, CartPostInterface>(apiRoutes.getCart);
};

export const useDeleteCart = () => {
  return useDelete(apiRoutes.getCart);
};
