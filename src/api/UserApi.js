import axiosClient from "./axiosClient"

export const UserApi = {
    get_All: () => {
        const endpoint = `/user/users`;
        return axiosClient.get(endpoint);
    },
    get: () => {
        // {
        //     name: response.name,
        //     userName: response.userName,
        //     _id: response._id,
        //     address: response.address,
        //     email: response.email,
        //     phoneNumber: response.phoneNumber
        // }
        const endpoint = `/user`;
        return axiosClient.get(endpoint);
    },
    // post: (data) => {
    //     const endpoint = `/user`;
    //     return axiosClient.post(endpoint, data);
    // },
    update: (params) => {
        const endpoint = `/user/${params}`;
        return axiosClient.update(endpoint);
    },
    delete: (params) => {
        const endpoint = `/user/${params}`;
        return axiosClient.delete(endpoint);
    },
    post_login: (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const endpoint = `/user/login`;
                    const response = await axiosClient.post(endpoint, data);
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            }, 2000)
        })

    }
}