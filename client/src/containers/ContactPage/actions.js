import * as constants from "./constants";
import * as userConstants from '../UserPage/constants';
import { getHistory } from "../configureStore";
import Message from "../shared/message";
import Errors from "../shared/error/errors";
import services from "./service";
import socket from '../socket';

const messageUpdateSuccess = "Cập nhật chi nhánh thành công.";
const messageCreateSuccess = "Tạo chi nhánh thành công.";
const messageDeleteSuccess = "Xóa chi nhánh thành công.";

const actions = {
    list: (filter = {}) => async dispatch => {
        try {
            dispatch({ type: constants.CONTACT_GET_START });

            let response = await services.listFn(filter);

            dispatch({
                type: constants.CONTACT_GET_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CONTACT_GET_ERROR
            });
        }
    },

    doFind: id => async dispatch => {
        try {
            dispatch({
                type: constants.CONTACT_FIND_START
            });

            const response = await services.findFn(id);
            dispatch({
                type: constants.CONTACT_FIND_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CONTACT_FIND_ERROR
            });
        }
    },

    doCreate: userInfo => async dispatch => {
        try {
            dispatch({
                type: userConstants.USER_ADD_CONTACT_START
            });

            await services.createFn(userInfo.id);
            socket.emit("add-new-contact", { contactId: userInfo.id });
            dispatch({
                type: userConstants.USER_ADD_CONTACT_SUCCESS,
                payload: { ...userInfo, type: "requestSent" }
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: userConstants.USER_ADD_CONTACT_ERROR
            });
        }
    },

    doUpdate: userInfo => async dispatch => {
        try {
            dispatch({
                type: userConstants.USER_UPDATE_CONTACT_START
            });

            await services.updateFn(userInfo.id);

            dispatch({
                type: userConstants.USER_UPDATE_CONTACT_SUCCESS,
                payload: { ...userInfo, type: "contact" }

            });

            Message.success(messageUpdateSuccess);
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: userConstants.USER_UPDATE_CONTACT_ERROR
            });
        }
    },

    doDestroyAll: ids => async dispatch => {
        await ids.forEach(async id => {
            dispatch(actions.doDestroy(id));
        });
    },

    doDestroy: userInfo => async dispatch => {
        try {
            dispatch({
                type: userConstants.USER_REMOVE_CONTACT_START
            });

            await services.destroyFn(userInfo.id);

            dispatch({
                type: userConstants.USER_REMOVE_CONTACT_SUCCESS,
                payload: { ...userInfo, type: "notContact" }
            });
            Message.success(messageDeleteSuccess);
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: userConstants.USER_REMOVE_CONTACT_ERROR
            });
        }
    }
};
export default actions;
