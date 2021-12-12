import axiosClient from "./axiosClient"

export const PaymentApi = {
    get_All: () => {
        const endpoint = `/payments`;
        return axiosClient.get(endpoint);
    },
    post: (data) => {

        return new Promise((resolve, reject) => {

            setTimeout(async () => {
                try {
                    const endpoint = `/payments`;
                    const response = await axiosClient.post(endpoint, data);
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 2000)

        })

    },
    update: (params, data) => {
        return new Promise((resolve, reject) => {

            setTimeout(async () => {
                try {
                    const endpoint = `/payments/${params}`;
                    const response = await axiosClient.patch(endpoint, data);
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 2000)

        })
    },
    delete: (params) => {
        const endpoint = `/payments/${params}`;
        return axiosClient.delete(endpoint);
    },
}