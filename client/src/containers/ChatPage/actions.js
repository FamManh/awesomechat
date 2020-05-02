import constants from "./constants";
import getStore, { getHistory } from "../configureStore";
import Errors from "../shared/error/errors";
import services from "./service";
import { emitSentMessage, emitCreateGroup } from "./socket";

const actions = {
    doToggleRightSidebar: () => ({ type: constants.CHAT_TOGGLE_RIGHT_SIDEBAR }),
    list: () => async (dispatch) => {
        try {
            dispatch({ type: constants.CHAT_GET_START });

            let response = await services.getListFn();

            dispatch({
                type: constants.CHAT_GET_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CHAT_GET_ERROR,
            });
            getHistory().push("/");
        }
    },
    doFind: (id) => async (dispatch) => {
        try {
            if (!id) {
                dispatch({
                    type: constants.CHAT_FIND_SUCCESS,
                    payload: null,
                });
                return;
            }
            dispatch({
                type: constants.CHAT_FIND_START,
            });

            const response = await services.findFn(id);
            dispatch({
                type: constants.CHAT_FIND_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CHAT_FIND_ERROR,
            });
        }
    },

    doCreate: (info) => async (dispatch) => {
        try {
            dispatch({
                type: constants.CHAT_CREATE_START,
            });

            const response = await services.createFn(info);
            emitSentMessage(response.data);

            let state = getStore().getState();
            let currentUser = state.user.current;
            dispatch({
                type: constants.CHAT_CREATE_SUCCESS,
                payload: { message: response.data, currentUser },
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CHAT_CREATE_ERROR,
            });
        }
    },

    listImage: (data) => async (dispatch) => {
        try {
            dispatch({
                type: constants.CHAT_GET_IMAGE_LIST_START,
            });

            const response = await services.listImageFn(data);

            dispatch({
                type: constants.CHAT_GET_IMAGE_LIST_SUCCESS,
                payload: {
                    images: response.data.images,
                    skip: data.skip,
                },
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CHAT_GET_IMAGE_LIST_ERROR,
            });
        }
    },

    listFile: (data) => async (dispatch) => {
        try {
            dispatch({
                type: constants.CHAT_GET_FILE_LIST_START,
            });

            const response = await services.listFileFn(data);

            dispatch({
                type: constants.CHAT_GET_FILE_LIST_SUCCESS,
                payload: {
                    files: response.data.files,
                    skip: data.skip,
                },
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CHAT_GET_FILE_LIST_ERROR,
            });
        }
    },

    doCreateGroup: (data) => async (dispatch) => {
        try {
            dispatch({
                type: constants.CHAT_CREATE_GROUP_START,
            });

            const response = await services.createGroupFn(data);
            if (response.status === 201) {
                // Created
                emitCreateGroup(response.data);
            }

            dispatch({
                type: constants.CHAT_CREATE_GROUP_SUCCESS,
                payload: response.data,
            });
            getHistory().push(`/m/${response.data.id}`);
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CHAT_CREATE_GROUP_ERROR,
            });
        }
    },

    doRemoveMember: (data) => async (dispatch) => {
        try {
            await services.removeMember(data);
            dispatch({
                type: constants.CHAT_GROUP_REMOVE_MEMBER_SUCCESS,
                payload: data.userId,
            });
        } catch (error) {
            Errors.handle(error);
        }
    },

    doAddNewMembers: (data) => async (dispatch) => {
        try {
            let usersId = data.members.map((item) => item.id);
            await services.addMembers({ ...data, members: usersId });
            dispatch({
                type: constants.CHAT_GROUP_ADD_MEMBERS_SUCCESS,
                payload: data.members,
            });
        } catch (error) {
            Errors.handle(error);
        }
    },

    doChatGroupChangeAvatar: (data) => async (dispatch) => {
        dispatch({
            type: constants.CHAT_GROUP_CHANGE_AVATAR,
            payload: data,
        });
    },

    doChatGroupUpdate: (data) => async (dispatch) => {
        try {
            const response = await services.updateChatGroupFn(data);
            dispatch({
                type: constants.CHAT_GROUP_UPDATE_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            Errors.handle(error);
        }
    },
};
export default actions;
