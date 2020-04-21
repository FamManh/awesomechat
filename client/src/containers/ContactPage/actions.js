import * as constants from "./constants";
import * as userConstants from "../UserPage/constants";
import Message from "../shared/message";
import Errors from "../shared/error/errors";
import services from "./service";
import {emitAddNewContact} from './socket';

const messageUpdateSuccess = "Update succesfully";
// const messageCreateSuccess = "Tạo chi nhánh thành công.";
const messageDeleteSuccess = "Delete succesfully";

const actions = {
    listContacts: () => async dispatch => {
        try {
            dispatch({ type: constants.CONTACT_GET_START });

            let response = await services.getListFn({ type: "contact" });

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
    listRequests: () => async dispatch => {
        try {
            dispatch({ type: constants.REQUEST_GET_START });

            let response = await services.getListFn({ type: "request" });

            dispatch({
                type: constants.REQUEST_GET_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.REQUEST_GET_ERROR
            });
        }
    },
    listRequestsSent: () => async dispatch => {
        try {
            dispatch({ type: constants.REQUEST_SENT_GET_START });

            let response = await services.getListFn({ type: "requestsent" });

            dispatch({
                type: constants.REQUEST_SENT_GET_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.REQUEST_SENT_GET_ERROR
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

            const response = await services.createFn(userInfo.id);
            emitAddNewContact(response.data);
            
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

            dispatch({
                type: constants.CONTACT_UPDATE_SUCCESS,
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

    doDestroyContact: userInfo => async dispatch => {
        try {
            dispatch({
                type: constants.CONTACT_DESTROY_START
            });

            await services.destroyFn(userInfo.id);

            dispatch({
                type: constants.CONTACT_DESTROY_SUCCESS,
                payload: userInfo.id
            });
            dispatch({
                type: userConstants.USER_REMOVE_CONTACT_SUCCESS,
                payload: { ...userInfo, type: "notContact" }
            });
            Message.success(messageDeleteSuccess);
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.CONTACT_DESTROY_ERROR
            });
        }
    },
    doDestroyRequest: userInfo => async dispatch => {
        try {
            dispatch({
                type: constants.REQUEST_DESTROY_START
            });

            await services.destroyFn(userInfo.id);

            dispatch({
                type: constants.REQUEST_DESTROY_SUCCESS,
                payload: userInfo.id
            });
            dispatch({
                type: userConstants.USER_REMOVE_CONTACT_SUCCESS,
                payload: { ...userInfo, type: "notContact" }
            });
            Message.success(messageDeleteSuccess);
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.REQUEST_DESTROY_ERROR
            });
        }
    },
    doDestroyRequestSent: userInfo => async dispatch => {
        try {
            dispatch({
                type: constants.REQUEST_SENT_DESTROY_START
            });

            await services.destroyFn(userInfo.id);

            dispatch({
                type: constants.REQUEST_SENT_DESTROY_SUCCESS,
                payload: userInfo.id
            });
            dispatch({
                type: userConstants.USER_REMOVE_CONTACT_SUCCESS,
                payload: { ...userInfo, type: "notContact" }
            });
            Message.success(messageDeleteSuccess);
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.REQUEST_SENT_DESTROY_ERROR
            });
        }
    },
    doAdded: data => async dispatch => {
        console.log(data);
        dispatch({
            type: constants.REQUEST_ADDED,
            payload: data
        });
    }
};
export default actions;
