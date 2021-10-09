import axiosClient from "./axiosClient"

export const ProductApi = {
    get_All: () => {
        const endpoint = `/books`;
        return axiosClient.get(endpoint);
    },
    post: (data) => {
        const endpoint = `/books`;
        return axiosClient.post(endpoint, data);
    },
    update: (params) => {
        const endpoint = `/books/${params}`;
        return axiosClient.update(endpoint);
    },
    delete: (params) => {
        const endpoint = `/books/${params}`;
        return axiosClient.delete(endpoint);
    },
}