import asapi from "../../api/asapi";

const services = {
    getIceServer: async () => {
        const response = await asapi.get(`/user/iceserver`);
        return response;
    },
};

export default services;
 