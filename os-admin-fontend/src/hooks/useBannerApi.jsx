import { useMutation, useQuery, useQueryClient } from "react-query";
import { createBanner, deleteBanner, getAllBanner, getBannerById, updateBanner } from "../api/BannerApi";

export const useBannerList = (onSuccess, onError) => {
  return useQuery("banner-list", getAllBanner, {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
  });
};

export const useAddBanner = (onSuccess, onError) => {
  return useMutation(createBanner, {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBanner, {
    onSuccess: () => {
      queryClient.invalidateQueries("banner-list");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useBannerById = (id) => {
  return useQuery(["banner", id], () => getBannerById(id), {
    enabled: !!id,
  });
};

export const useUpdateBanner = (onSuccess, onError) => {
  return useMutation(updateBanner, {
    onSuccess: onSuccess ?? ((data) => console.log("Category updated", data)),
    onError:
      onError ?? ((error) => console.error("Error updating category", error)),
  });
};
