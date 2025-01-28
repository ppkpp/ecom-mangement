import { request } from "../utils/axios-utils"

export const getAllNoti = () => {
    return request({ url: `/notification` })
}

export const createNoti = (notiData) => {
    return request({
        url: `/notification`,
        method: "POST",
        data: notiData
    });
}

export const deleteNoti = (id) => {
    return request({
        url: `/notification/${id}`,
        method: "DELETE",
    });
}

export const getNotiById = (id) => {
    return request({
        url: `/notification/${id}`,
    });
}

export const updateNoti = (updatedData) => {
    const { id, ...data } = updatedData
    return request({
        url: `/notification/${id}`,
        method: "PATCH",
        data: data,
    });
};
