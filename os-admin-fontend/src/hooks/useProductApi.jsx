import { useMutation, useQuery, useQueryClient } from "react-query";
import { createProduct, deleteProduct, getAllProduct, getPaginateProduct, getProductById, updateProduct } from "../api/productApi";

export const useProductList = (onSuccess,onError)=>
{
    return useQuery("product-list", getAllProduct,{
        onSuccess:onSuccess??((data)=>console.log(data)),
        onError:onError??((error)=>console.error(error))    
    });
}


export const usePaginateProductList = (pageNumber, onSuccess, onError) => {
  return useQuery(
    ["product-list", pageNumber],
    ()=>getPaginateProduct(pageNumber),
    {
      onSuccess: onSuccess ?? ((data) => console.log(data)),
      onError: onError ?? ((error) => console.error(error)),
    }
  );
};

export const useAddProduct = (onSuccess,onError)=>
{
    return useMutation(createProduct,{
        onSuccess:onSuccess??((data)=>console.log(data)),
        onError:onError??((error)=>console.error(error))
    });
}


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("product-list");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useProductById = (id) => {
  return useQuery(["category", id], () => getProductById(id), {
    enabled: !!id,
  });
};


export const useUpdateProduct = (onSuccess, onError) => {
  return useMutation(updateProduct, {
    onSuccess: onSuccess ?? ((data) => console.log("Product updated", data)),
    onError:
      onError ?? ((error) => console.error("Error updating product", error)),
  });
};
