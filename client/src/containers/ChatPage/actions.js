import constants from "./constants";
import getStore, { getHistory } from "../configureStore";
import Errors from "../shared/error/errors";
import services from "./service";
import { emitSentMessage, emitCreateGroup } from "./socket";
import layoutConstants from "../Layout/constants";
import layoutActions from '../Layout/actions'

const actions = {
    doToggleScrollToBottom: () => ({
        type: constants.CHAT_SCROLL_TO_BOTTOM_TOGGLE,
    }),
    doClear:()=>({
        type: constants.CHAT_CLEAR_DATA
    }),
    // Lấy danh sách những cuộc trò chuyện
    list: (data) => async (dispatch) => {
        try {
            dispatch({ type: constants.CHAT_GET_START });
            let gskip = data && data.gskip ?  data.gskip : 0
            let pskip = data && data.pskip ? data.pskip : 0;
            let response = await services.getListFn({ gskip, pskip });

            dispatch({
                type: constants.CHAT_GET_SUCCESS,
                payload: {
                    messages: response.data,
                    skip: gskip + pskip,
                },
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CHAT_GET_ERROR,
            });
            getHistory().push("/");
        }
    },

    // lấy thông tin cuộc trò chuyện theo id
    doFind: (id, skip = 0, limit = 20) => async (dispatch) => {
        try {
                if (!id) {
                    return;
                }
                dispatch({
                    type: constants.CHAT_FIND_START,
                });

                const response = await services.findFn(id, skip, limit);
                dispatch({
                    type: constants.CHAT_FIND_SUCCESS,
                    payload: { data: response.data, skip },
                });
                dispatch(layoutActions.doHideLeftSidebar());
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
                dispatch(
                    actions.doCreate({
                        type: "notification",
                        message: `${
                            response.data.admin.firstname +
                            " " +
                            response.data.admin.lastname
                        } created the group.`,
                        receiver: response.data.id,
                        conversationType: "ChatGroup",
                    })
                );
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
            if (data.currentUser.id !== data.userId) {
                dispatch(
                    actions.doCreate({
                        type: "notification",
                        message: `${
                            data.currentUser.firstname +
                            " " +
                            data.currentUser.lastname
                        } removed ${data.member.firstname + " " + data.member.lastname} from the group.`,
                        receiver: data.groupId,
                        conversationType: "ChatGroup",
                    })
                );
            }else{
                 dispatch({
                     type: constants.CHAT_GROUP_LEAVE,
                     payload: data.groupId,
                 });
                getHistory().push('/')
                dispatch({
                    type: layoutConstants.LAYOUT_LEFT_SIDEBAR_SHOW
                })
            }
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
            dispatch(
                actions.doCreate({
                    type: "notification",
                    message: data.message,
                    receiver: data.groupId,
                    conversationType: "ChatGroup",
                })
            );
        } catch (error) {
            Errors.handle(error);
        }
    },

    doChatGroupChangeAvatar: (data) => async (dispatch) => {
        dispatch({
            type: constants.CHAT_GROUP_CHANGE_AVATAR,
            payload: data,
        });
         dispatch(
             actions.doCreate({
                 type: "notification",
                 message: data.message,
                 receiver: data.groupId,
                 conversationType: "ChatGroup",
             })
         );
    },

    doChatGroupUpdate: (data) => async (dispatch) => {
        try {
            const response = await services.updateChatGroupFn({name: data.name, id: data.id});
            dispatch({
                type: constants.CHAT_GROUP_UPDATE_SUCCESS,
                payload: response.data,
            });
            dispatch(
                actions.doCreate({
                    type: "notification",
                    message: data.message,
                    receiver: data.id,
                    conversationType: "ChatGroup",
                })
            );
        } catch (error) {
            Errors.handle(error);
        }
    },
};
export default actions;
