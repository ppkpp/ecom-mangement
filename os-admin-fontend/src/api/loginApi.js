import { request } from "../utils/axios-utils"

export const loginNow = (loginForm) => {
    return request({
        url: `/login`,
        method: "POST",
        data: loginForm
    });
};