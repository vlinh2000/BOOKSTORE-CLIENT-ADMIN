import axiosClient from "./axiosClient"

export const ProductApi = {
    get_All: () => {
        const endpoint = `/books`;
        return axiosClient.get(endpoint);
    },
    post: (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const endpoint = `/books`;
                    const response = await axiosClient.post(endpoint, data);
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            }, 2000)
        })
    },
    update: (params, data) => {
        const endpoint = `/books/${params}`;
        return axiosClient.patch(endpoint, data);
    },
    delete: (params) => {
        const endpoint = `/books/${params}`;
        return axiosClient.delete(endpoint);
    },
}