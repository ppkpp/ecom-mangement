import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../api/categoryApi";

export const useCategoryList = (pageNumber, onSuccess, onError) => {
  return useQuery(["category", pageNumber], () => getAllCategory(pageNumber), {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
    keepPreviousData: true, // Helps with pagination smoothness
  });
};

export const useAddCategory = (onSuccess, onError) => {
  return useMutation(createCategory, {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("category");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useCategoryById = (id) => {
  return useQuery(["category", id], () => getCategoryById(id), {
    enabled: !!id,
  });
};

export const useUpdateCategory = (onSuccess, onError) => {
  return useMutation(updateCategory, {
    onSuccess: onSuccess ?? ((data) => console.log("Category updated", data)),
    onError:
      onError ?? ((error) => console.error("Error updating category", error)),
  });
};
