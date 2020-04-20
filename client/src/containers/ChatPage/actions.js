import constants from "./constants";
import userConstants from "../UserPage/constants";
import getStore, { getHistory } from "../configureStore";
import message from "../shared/message";
import Errors from "../shared/error/errors";
import services from "./service";
import { emitSentMessage, emitCreateGroup } from "./socket";

const actions = {
    doToggleRightSidebar: ()=> ({ type: constants.CHAT_TOGGLE_RIGHT_SIDEBAR }),
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
            getHistory().push('/')
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
};
export default actions;
