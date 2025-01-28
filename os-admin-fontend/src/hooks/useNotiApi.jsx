import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createNoti,
  deleteNoti,
  getAllNoti,
  getNotiById,
  updateNoti,
} from "../api/NotiApi";

export const useNotiList = (onSuccess, onError) => {
  return useQuery("noti", getAllNoti, {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
  });
};

export const useAddNoti = (onSuccess, onError) => {
  return useMutation(createNoti, {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
  });
};

export const useDeleteNoti = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteNoti, {
    onSuccess: () => {
      queryClient.invalidateQueries("noti");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useNotiById = (id) => {
  return useQuery(["noti", id], () => getNotiById(id), {
    enabled: !!id,
  });
};

export const useUpdateNoti = (onSuccess, onError) => {
  return useMutation(updateNoti, {
    onSuccess:
      onSuccess ?? ((data) => console.log("Notification updated", data)),
    onError:
      onError ??
      ((error) => console.error("Error updating notification", error)),
  });
};
