import * as constants from "./constants";
import produce from "immer";
const initialState = {
    initLoading: true,
    dataLoading: false,
    findLoading: false,
    saveLoading: false,
    destroyLoading: false,
    exportLoading: false,
    error: null,
    redirectTo: "/contact",
    selectedRowKeys: [],
    selectedRows: [],
    record: null,
    contactLoading: false,
    requestLoading: false,
    requestSentLoading: false,
    contacts: [],
    requests: [],
    requestsSent: []
};

const contactReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case constants.CONTACT_REQUEST_ADDED:
                draft.requests.push(payload);
                break;
            case constants.CONTACT_REQUEST_ADD:
                // Tìm trong danh sách request đã tồn tại request này chưa? 
                let existsRequest = state.requests.filter(item=>item.id === payload.id)
                if (existsRequest.length === 0) {
                    draft.requests.push(payload);
                } 
                break;
            case constants.CONTACT_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                break;
            case constants.CONTACT_CREATE_SUCCESS:
                draft.saveLoading = false;
                draft.error = null;
                break;
            case constants.CONTACT_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case constants.CONTACT_GET_START:
                draft.contactLoading = true;
                draft.error = null;
                break;
            case constants.CONTACT_GET_SUCCESS:
                draft.contactLoading = false;
                draft.contacts = payload;
                draft.error = null;
                break;
            case constants.CONTACT_GET_ERROR:
                draft.contactLoading = false;
                draft.error = payload;
                break;
            case constants.REQUEST_GET_START:
                draft.requestLoading = true;
                draft.error = null;
                break;
            case constants.REQUEST_GET_SUCCESS:
                draft.requestLoading = false;
                draft.requests = payload;
                draft.error = null;
                break;
            case constants.REQUEST_GET_ERROR:
                draft.requestLoading = false;
                draft.error = payload;
                break;
            case constants.REQUEST_SENT_GET_START:
                draft.requestSentLoading = true;
                draft.error = null;
                break;
            case constants.REQUEST_SENT_GET_SUCCESS:
                draft.requestSentLoading = false;
                draft.requestsSent = payload;
                draft.error = null;
                break;
            case constants.REQUEST_SENT_GET_ERROR:
                draft.requestSentLoading = false;
                draft.error = payload;
                break;
            case constants.CONTACT_UPDATE_START:
                draft.saveLoading = true;
                draft.error = null;
                break;
            case constants.CONTACT_UPDATE_SUCCESS:
                draft.saveLoading = false;
                draft.contacts.push(payload);
                draft.requests = state.requests.filter(
                    (item) => item.id !== payload.id
                );
                draft.error = null;
                break;
            case constants.CONTACT_UPDATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case constants.CONTACT_DESTROY_START:
                draft.destroyLoading = true;
                draft.error = null;
                break;
            case constants.CONTACT_DESTROY_SUCCESS:
                draft.destroyLoading = false;
                draft.contacts = state.contacts.filter(
                    (contact) => contact.id !== payload
                );
                draft.error = null;
                break;
            case constants.CONTACT_DESTROY_ERROR:
                draft.destroyLoading = false;
                draft.error = payload;
                break;
            case constants.REQUEST_DESTROY_START:
                draft.destroyLoading = true;
                draft.error = null;
                break;
            case constants.REQUEST_DESTROY_SUCCESS:
                draft.destroyLoading = false;
                draft.requests = state.requests.filter(
                    (contact) => contact.id !== payload
                );
                draft.error = null;
                break;
            case constants.REQUEST_DESTROY_ERROR:
                draft.destroyLoading = false;
                draft.error = payload;
                break;
            case constants.REQUEST_SENT_DESTROY_START:
                draft.destroyLoading = true;
                draft.error = null;
                break;
            case constants.REQUEST_SENT_DESTROY_SUCCESS:
                draft.destroyLoading = false;
                draft.requestsSent = state.requestsSent.filter(
                    (contact) => contact.id !== payload
                );
                draft.error = null;
                break;
            case constants.REQUEST_SENT_DESTROY_ERROR:
                draft.destroyLoading = false;
                draft.error = payload;
                break;
            case constants.CONTACT_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                break;
            case constants.CONTACT_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.error = null;
                break;
            case constants.CONTACT_FIND_ERROR:
                draft.findLoading = false;
                draft.error = payload;
                break;
            default:
                break;
        }
    });

export default contactReducer;
