import { request } from "../utils/axios-utils"

export const getAllProduct = () => {
    return request({ url: `/product` })
}

export const getPaginateProduct = (pageNumber, searchParams = {}) => {
    const queryParams = new URLSearchParams({ limit: 8, page: pageNumber, ...searchParams }).toString();

    return request({ url: `/product?${queryParams}` });
};

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
