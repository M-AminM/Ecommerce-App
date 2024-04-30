import {
  UserInterface,
  UserPostInterface,
  UserResInterface,
} from "../interfaces/user";
import { apiRoutes } from "../routes/apiRoutes";
import { useFetch, usePost } from "../service/reactQuery";
import { pathToUrl } from "../utils/router";

export const useGetUserById = (id: number) =>
  useFetch<UserInterface>(pathToUrl(apiRoutes.getUserByID, { id }));

export const useLoginUser = () => {
  return usePost<UserResInterface, UserPostInterface>(apiRoutes.getLogin);
};
