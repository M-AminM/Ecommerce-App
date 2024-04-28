import { ProductInterface } from "../interfaces/product";
import { apiRoutes } from "../routes/apiRoutes";
import { useFetch } from "../service/reactQuery";
import { pathToUrl } from "../utils/router";

export const useGetProducts = (params: object) =>
  useFetch<ProductInterface[]>(apiRoutes.getProducts, params);

export const useGetProductById = (id: number) =>
  useFetch<ProductInterface>(pathToUrl(apiRoutes.getProductByID, { id }));
