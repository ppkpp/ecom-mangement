import { request } from "../utils/axios-utils"


export const getMyProfile = () => {
    return request({
        url: `user/current_user/me`,
    });
}

export const updateProfile = (updatedData) => {
    return request({
        url: `/me`,
        method: "PATCH",
        data: updatedData,
    });
};
