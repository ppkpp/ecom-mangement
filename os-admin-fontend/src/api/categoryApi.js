import { request } from "../utils/axios-utils"

export const getAllCategory = () => {
    return request({ url: `/category/list` })
}

export const getPaginateCategory = (pageNumber) => {
    return request({ url: `/category?limit=10&page=${pageNumber}` })
}

export const createCategory = (categoryData) => {
    return request({
        url: `/category`,
        method: "POST",
        data: categoryData
    });
};

export const deleteCategory = (id) => {
    return request({
        url: `/category/${id}`,
        method: "DELETE",
    });
}

export const getCategoryById = (id) => {
    return request({
        url: `/category/${id}`,
    });
}

export const updateCategory = (updatedData) => {
    const { id, ...data } = updatedData
    return request({
        url: `/category/${id}`,
        method: "PATCH",
        data: data,
    });
};
