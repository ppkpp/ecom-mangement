import { request } from "../utils/axios-utils"

export const getAllUser = () => {
    return request({ url: `/user` })
}

export const createUser = (userData) => {
    return request({
        url: `/user`,
        method: "POST",
        data: userData
    })
}

export const deleteUser = (id) => {
    return request({
        url: `/user/${id}`,
        method: "DELETE"
    })
}

export const getUserById = (id) => {
    return request({
        url: `/user/${id}`
    })
}

export const updateUser = (updatedData) => {
    const { id, ...data } = updatedData
    return request({
        url: `/user/${id}`,
        method: "PATCH",
        data: data,
    });
};
