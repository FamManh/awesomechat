import * as constants from "./constants";
import Message from "../shared/message";
import Errors from "../shared/error/errors";
import services from "./service";

const messageUpdateSuccess = "Update successfully";
// const messageCreateSuccess = "Create successfully";
// const messageDeleteSuccess = "Delete successfully";

const actions = {
    doChangeAvatar: (avatar) => async (dispatch) => {
        dispatch({
            type: constants.USER_CHANGE_AVATAR,
            payload: avatar,
        });
    },

    list: (filter = {}) => async (dispatch) => {
        try {
            dispatch({ type: constants.USER_GET_START });

            let response = await services.listFn(filter);

            dispatch({
                type: constants.USER_GET_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.USER_GET_ERROR,
            });
        }
    },

    doFind: (id) => async (dispatch) => {
        try {
            dispatch({
                type: constants.USER_FIND_START,
            });

            const response = await services.findFn(id);
            dispatch({
                type: constants.USER_FIND_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.USER_FIND_ERROR,
            });
        }
    },

    doUpdateAvatar: (data) => async (dispatch) => {
        try {
            dispatch({
                type: constants.USER_UPDATE_START,
            });

            await services.updateMediaFn(data);

            dispatch({
                type: constants.USER_UPDATE_SUCCESS,
            });

            // getHistory().push("/constants.USER");
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: constants.USER_UPDATE_ERROR,
            });
        }
    },
    getCurrent: () => async (dispatch) => {
        try {
            dispatch({
                type: constants.USER_GET_CURRENT_START,
            });
            let response = await services.getCurrent();
            dispatch({
                type: constants.USER_GET_CURRENT_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: constants.USER_GET_CURRENT_ERROR,
            });
        }
    },

    doUpdate: (userInfo) => async (dispatch) => {
        try {
            dispatch({
                type: constants.USER_UPDATE_START,
            });

            const response = await services.updateFn(userInfo);

        
            dispatch({
                type: constants.USER_UPDATE_SUCCESS,
                payload: response.data,
            });

            // Message.success(messageUpdateSuccess);

            // getHistory().push("/constants.USER");
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: constants.USER_UPDATE_ERROR,
            });
        }
    },

    doUpdatePassword: (userInfo) => async (dispatch) => {
        try {
            dispatch({
                type: constants.USER_UPDATE_START,
            });

            await services.updatePasswordFn(userInfo);

            dispatch({
                type: constants.USER_UPDATE_SUCCESS
            });

            Message.success(messageUpdateSuccess);

            // getHistory().push("/constants.USER");
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: constants.USER_UPDATE_ERROR,
            });
        }
    },

    // doDestroyAll: ids => async dispatch => {
    //     await ids.forEach(async id => {
    //         dispatch(actions.doDestroy(id));
    //     });
    // },

    // doDestroy: id => async dispatch => {
    //     try {
    //         dispatch({
    //             type: constants.USER_DESTROY_START
    //         });

    //         await services.destroyFn(id);

    //         dispatch({
    //             type: constants.USER_DESTROY_SUCCESS,
    //             payload: id
    //         });
    //         Message.success(messageDeleteSuccess);
    //     } catch (error) {
    //         Errors.handle(error);
    //         dispatch({
    //             type: constants.USER_DESTROY_ERROR
    //         });
    //     }
    // }
};
export default actions;
