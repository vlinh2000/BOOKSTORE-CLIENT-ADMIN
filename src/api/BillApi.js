import axiosClient from "./axiosClient"

export const BillApi = {
    get_All: () => {
        const endpoint = `/bills`;
        return axiosClient.get(endpoint);
    },
    post: (data) => {
        const endpoint = `/bills`;
        return axiosClient.post(endpoint, data);
    },
    update: (params, data) => {
        const endpoint = `/bills/${params}`;
        return axiosClient.patch(endpoint, data);
    },
    delete: (params) => {
        const endpoint = `/bills/${params}`;
        return axiosClient.delete(endpoint);
    },
}