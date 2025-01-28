import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../api/UserApi";

export const useUserList = (onSuccess, onError) => {
  return useQuery("user-list", getAllUser, {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
  });
};

export const useAddUser = (onSuccess, onError) => {
  return useMutation(createUser, {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
  });
};

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user-list");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useUserById = (id) => {
  return useQuery(["user", id], () => getUserById(id), {
    enabled: !!id,
  });
};

export const useUpdateUser = (onSuccess, onError) => {
  return useMutation(updateUser, {
    onSuccess: onSuccess ?? ((data) => console.log("User updated", data)),
    onError:
      onError ?? ((error) => console.error("Error updating user", error)),
  });
};
