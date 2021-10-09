import axiosClient from "./axiosClient"

export const CategoryApi = {
    get_All: () => {
        const endpoint = `/categories`;
        return axiosClient.get(endpoint);
    },
    post: (data) => {
        const endpoint = `/categories`;
        return axiosClient.post(endpoint, data);
    },
    update: (params) => {
        const endpoint = `/categories/${params}`;
        return axiosClient.update(endpoint);
    },
    delete: (params) => {
        const endpoint = `/categories/${params}`;
        return axiosClient.delete(endpoint);
    },
}