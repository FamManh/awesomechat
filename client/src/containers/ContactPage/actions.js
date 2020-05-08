import * as constants from "./constants";
import * as userConstants from "../UserPage/constants";
import Errors from "../shared/error/errors";
import services from "./service";
import {emitAddNewContact, emitAcceptRequestContact} from './socket';

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

            const response = await services.updateFn(userInfo.id);
            emitAcceptRequestContact({id: response.data.userId})
            dispatch({
                type: userConstants.USER_UPDATE_CONTACT_SUCCESS,
                payload: { ...userInfo, type: "contact" }
            });

            dispatch({
                type: constants.CONTACT_UPDATE_SUCCESS,
                payload: { ...userInfo, type: "contact" }
            });

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
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: constants.REQUEST_SENT_DESTROY_ERROR
            });
        }
    },
    doAdded: data => async dispatch => {
        dispatch({
            type: constants.CONTACT_REQUEST_ADDED,
            payload: data
        });
    }
};
export default actions;
