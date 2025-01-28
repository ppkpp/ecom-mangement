import { request } from "../utils/axios-utils"

export const getAllProduct = () => {
    return request({ url: `/product` })
}

export const getPaginateProduct = (pageNumber) => {
    return request({ url: `/product?limit=8&page=${pageNumber}` })
}

export const getProductById = (id) => {
    return request({
        url: `/product/${id}`,
    });
}

export const createProduct = (productData) => {
    return request({
        url: `/product`,
        method: "POST",
        data: productData
    });
};

export const deleteProduct = (id) => {
    return request({
        url: `/product/${id}`,
        method: "DELETE",
    });
}

export const updateProduct = (updatedData) => {
    const { id, ...data } = updatedData
    return request({
        url: `/product/${id}`,
        method: "PATCH",
        data: data,
    });
};
