import constants from "./constants";
import produce from "immer";

const initialState = {
    initLoading: true,
    findLoading: false,
    error: null,
    record: null,
    messages: [],
    inputMesage: {
        images: [],
        text: "",
        files: [],
    },
    typing: {},
    rightSidebarVisible: false,
};

const messageReducer = (state = initialState, { type, payload }) =>
    produce(state, (draft) => {
        let currentUser, message;
        switch (type) {
            case constants.CHAT_TOGGLE_RIGHT_SIDEBAR:
                draft.rightSidebarVisible = !state.rightSidebarVisible;
                break;
            case constants.INPUT_MESSAGE_CHANGE:
                draft.inputMesage.text = payload;
                break;
            case constants.INPUT_IMAGE_LIST_CHANGE:
                draft.inputMesage.images = payload;
                break;
            case constants.INPUT_FILE_LIST_CHANGE:
                draft.inputMesage.files = payload;
                break;
            case constants.CHAT_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                break;
            case constants.CHAT_CREATE_SUCCESS:
                draft.saveLoading = false;
                draft.error = null;
                break;
            case constants.CHAT_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case constants.CHAT_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                draft.typing = {};
                draft.rightSidebarVisible = false;
                break;
            case constants.CHAT_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.error = null;
                break;
            case constants.CHAT_FIND_ERROR:
                draft.findLoading = false;
                draft.record = null;
                draft.error = payload;
                break;
            case constants.CHAT_GET_START:
                draft.messageLoading = true;
                draft.error = null;
                draft.typing = {};
                break;
            case constants.CHAT_GET_SUCCESS:
                draft.messageLoading = false;
                draft.messages = payload;
                draft.error = null;
                break;
            case constants.CHAT_GET_ERROR:
                draft.messageLoading = false;
                draft.error = payload;
                break;
            case constants.SOCKET_SENT_MESSAGE:
                currentUser = payload.currentUser;
                message = payload.message;
                // Nếu tin nhắn đang mở thì thêm vào tin nhắn
                if (
                    (state.record &&
                        state.record.receiver.id === message.sender._id) ||
                    (state.record &&
                        state.record.receiver.id === message.receiver._id)
                ) {
                    draft.record.messages.push(message);
                } else if (
                    state.record &&
                    state.record.receiver.id === message.receiver._id &&
                    state.record.conversationType === "ChatGroup"
                ) {
                    // chat group
                    draft.record.messages.push(message);
                }

                // Tìm index của item hiện tại trong danh sách  mesages
                let receivedMessageIndex = "";
                if (message.conversationType === "ChatGroup") {
                    // Xử lý chat group
                    receivedMessageIndex = state.messages.findIndex((item) => {
                        return message.receiver._id === item.receiver._id;
                    });
                    console.log(receivedMessageIndex);
                } else if (message.conversationType === "User") {
                    receivedMessageIndex = state.messages.findIndex((item) => {
                        return (
                            (message.sender._id === item.sender._id &&
                                message.receiver._id === item.receiver._id) ||
                            (message.sender._id === item.receiver._id &&
                                message.receiver._id === item.sender._id)
                        );
                    });
                }

                if (receivedMessageIndex === 0) {
                    // Nếu tin nhắn hiện tại đã nằm đầu danh sách thì thay đổi tin nhắn cuối cùng
                    draft.messages[0].message = message.message;
                    draft.messages[0].type = message.type;
                } else if (receivedMessageIndex === -1) {
                    // Nếu không có tin nhắn hiện tại trong danh sách thì thêm vào đầu
                    draft.messages.unshift({
                        sender: message.sender,
                        receiver: message.receiver,
                        message: message.message,
                        type: message.type,
                    });
                } else {
                    // Nếu tin nhắn hiện tại trong danh sách thì đưa lên đầu
                    let [removedMessge] = draft.messages.splice(
                        receivedMessageIndex,
                        1
                    );
                    draft.messages.unshift({
                        ...removedMessge,
                        message: message.message,
                        type: message.type,
                    });
                }
                break;
            case constants.SOCKET_CREATE_GROUP:
                draft.typing = {};
                draft.messages.unshift({
                    sender: {},
                    receiver: {
                        _id: payload.id,
                        name: payload.name,
                    },
                    message: "",
                    conversationType: "ChatGroup",
                    updatedAt: payload.updatedAt,
                });
                draft.error = null;
                break;
            case constants.SOCKET_TYPING_ON:
                if (state.record) {
                    if (
                        payload.conversationType === "ChatGroup" &&
                        payload.receiver.id === state.record.receiver.id
                    ) {
                        draft.typing.status = true;
                        draft.typing.info = payload.info;
                    } else if (
                        payload.conversationType === "User" &&
                        payload.info.id === state.record.receiver.id
                    ) {
                        draft.typing.status = true;
                        draft.typing.info = payload.info;
                    }
                }
                break;
            case constants.SOCKET_TYPING_OFF:
                if (state.record) {
                    if (
                        payload.conversationType === "ChatGroup" &&
                        payload.receiver.id === state.record.receiver.id
                    ) {
                        draft.typing = {};
                    } else if (
                        payload.conversationType === "User" &&
                        payload.info.id === state.record.receiver.id
                    ) {
                        draft.typing = {};
                    }
                }
                break;
            case constants.CHAT_CREATE_GROUP_START:
                draft.findLoading = true;
                break;
            case constants.CHAT_CREATE_GROUP_SUCCESS:
                draft.findLoading = false;
                break;
            case constants.CHAT_CREATE_GROUP_ERROR:
                draft.findLoading = false;
                break;

            default:
                break;
        }
    });

export default messageReducer;
