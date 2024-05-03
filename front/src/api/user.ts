import {
  UserInterface,
  UserPostInterface,
  UserResInterface,
  UserSignupRes,
} from "../interfaces/user";
import { apiRoutes } from "../routes/apiRoutes";
import { useFetch, usePost } from "../service/reactQuery";
import { pathToUrl } from "../utils/router";

export const useGetUserById = (id: number) =>
  useFetch<UserInterface>(pathToUrl(apiRoutes.getUserByID, { id }));

export const useLoginUser = () => {
  return usePost<UserResInterface, UserPostInterface>(apiRoutes.getLogin);
};

export const useSignupUser = () => {
  return usePost<UserSignupRes, UserPostInterface>(apiRoutes.getSignup);
};
