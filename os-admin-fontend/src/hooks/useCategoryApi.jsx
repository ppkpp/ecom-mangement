import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  getPaginateCategory,
  updateCategory,
} from "../api/categoryApi";

export const useCategoryList = (onSuccess, onError) => {
  return useQuery(["category"], getAllCategory, {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
    keepPreviousData: true, // Helps with pagination smoothness
  });
};

export const usePaginateCategoryList = (pageNumber, onSuccess, onError) => {
  return useQuery(
    ["category", pageNumber],
    () => getPaginateCategory(pageNumber),
    {
      onSuccess: onSuccess ?? ((data) => console.log(data)),
      onError: onError ?? ((error) => console.error(error)),
    }
  );
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
