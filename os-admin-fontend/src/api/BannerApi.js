import { request } from "../utils/axios-utils"

export const getAllBanner = () => {
    return request({ url: `/banner` })
}

export const createBanner = (bannerData) => {
    return request({
        url: `/banner`,
        method: "POST",
        data: bannerData
    });
}

export const deleteBanner = (id) => {
    return request({
        url: `/banner/${id}`,
        method: "DELETE",
    });
}

export const getBannerById = (id) => {
    return request({
        url: `/banner/${id}`,
    });
}

export const updateBanner = (updatedData) => {
    const { id, ...data } = updatedData
    return request({
        url: `/banner/${id}`,
        method: "PATCH",
        data: data,
    });
};
