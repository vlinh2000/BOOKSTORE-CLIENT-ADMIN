import axiosClient from "./axiosClient"

export const UserApi = {
    get_All: () => {
        const endpoint = `/user/users`;
        return axiosClient.get(endpoint);
    },
    get: () => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const endpoint = `/user`;
                    const response = await axiosClient.get(endpoint);
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            }, 2000);
        })
    },
    // post: (data) => {
    //     const endpoint = `/user`;
    //     return axiosClient.post(endpoint, data);
    // },
    update: (params, data) => {
        const endpoint = `/user/${params}`;
        return axiosClient.patch(endpoint, data);
    },
    delete: (params) => {
        const endpoint = `/user/${params}`;
        return axiosClient.delete(endpoint);
    },
    post_login: (data) => {
        const endpoint = `/user/login`;
        return axiosClient.post(endpoint, data);

    }
}