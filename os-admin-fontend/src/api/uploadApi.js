import { request } from "../utils/axios-utils"

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return request({
        url: `/upload`,
        method: "POST",
        data: formData, // Pass formData as the request body
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};