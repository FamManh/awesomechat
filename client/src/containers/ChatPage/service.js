import asapi from "../../api/asapi";

const services = {
    // listFn: async ({ term }) => {
    //     let url = "/user";
    //     url = term ? url + `?term=${term}` : url;
    //     const response = await asapi.get(url);
    //     return response;
    // },
    getListFn: async ({gskip=0, pskip=0}) => {
        const response = await asapi.get(`/message?gskip=${gskip}&pskip=${pskip}`);
        return response;
    },

    findFn: async (id, skip, limit) => {
        const response = await asapi.get(`/message/${id}?skip=${skip}&limit=${limit}`);
        return response;
    },

    createFn: async (info) => {
        const response = await asapi.post(`/message`, info);
        return response;
    },

    updateFn: async (id, message) => {
        const response = await asapi.patch(`/message?user=${id}`, message);
        return response;
    },

    destroyFn: async (id) => {
        const response = await asapi.delete(`/message?user=${id}`);
        return response;
    },

    listImageFn: async ({ id, skip = 0, limit = 9 }) => {
        const response = await asapi.get(
            `/message/images?id=${id}&skip=${skip}&limit=${limit}`
        );
        return response;
    },

    listFileFn: async ({ id, skip = 0, limit = 9 }) => {
        const response = await asapi.get(
            `/message/files?id=${id}&skip=${skip}&limit=${limit}`
        );
        return response;
    },

    createGroupFn: async (info) => {
        const response = await asapi.post(`/chat-group`, info);
        return response;
    },

    updateChatGroupFn: async (info) => {
        const response = await asapi.patch(`/chat-group`, info);
        return response;
    },

    removeMember: async ({ groupId, userId }) => {
        const response = await asapi.delete(
            `/chat-group/member?group=${groupId}&user=${userId}`
        );
        return response;
    },

    addMembers: async (data) => {
        const response = await asapi.patch(`/chat-group/member`, data);
        return response;
    },
};

export default services;
