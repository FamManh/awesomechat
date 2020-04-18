import React from "react";
import getSocket, { configSocket } from "../rootSocket";
import getStore from "../configureStore";
import Message from "../shared/message";
import { Modal, Row } from "antd";
import AvatarCus from "../../components/AvatarCus";
import peerjs from "peerjs";
import constants from "./constants";
import CallPage from ".";

const showModalCallRequest = (caller) => {
    Modal.confirm({
        icon: null,
        content: (
            <Row
                type="flex"
                align="middle"
                justify="center"
                className="px-3 bg-white mh-page"
            >
                <div style={{ textAlign: "center" }}>
                    <AvatarCus record={caller} size={100} />
                    <p style={{ marginTop: "15px" }}>
                        <strong>{caller.firstname}</strong> calling you...
                    </p>
                </div>
            </Row>
        ),
        okText: "Anwser",
        cancelText: "Cancel",
        cancelButtonProps: { type: "danger" },
        onOk() {
            onAnwser(caller);
        },
        onCancel() {},
        maskClosable: false,
    });
};

export const emitCheckListenerStatus = (payload) => {
    getSocket().emit("caller-server-check-listener-status", payload);
};
const onAnwser = (payload) => {};

export const onListenerOffline = (payload) => {
    console.log(payload);
    if (payload.status === "offline") {
        // Nếu listener offline thì trả thông báo về cho caller
        Message.info({
            ...payload.listener,
            message: `${payload.listener.firstname}  is not online now.`,
        });
    } else {
        // Nếu listener online thì open popup
        getStore().dispatch({
            type: constants.CALL_RESPONSE_CONTACTING,
            payload: payload,
        });
    }
};

export const onRequestPeerId = (payload) => {
    // showModalCallRequest(payload.caller)
    // lắng nghe yêu cầu peerid
    // tạo peerid và trả về cho server
    // const peer = new peerjs();
    // peer.on("open", (peerId) => {
    //     // b04. Trả lại thông tin và peerid cho server
    //     console.log(peerId);
    //     getSocket().emit("listener-server-listener-peer-id", {
    //         ...payload,
    //         listenerPeerId: peerId,
    //     });
    // });
    getSocket().emit("listener-server-listener-peer-id", {
        ...payload,
    });
};

export const onResponeListenerPeerId = (payload) => {
    console.log("====================================");
    console.log(payload);

    // b06. Yêu cầu call
    getSocket().emit("caller-server-request-call", {
        listener: payload.listener,
        caller: payload.caller,
    });
};

export const emitCallerCancelRequestCall = (payload) => {
    // 07. Người gọi hủy cuộc gọi
    getSocket().emit("caller-server-cancel-request-call", payload);
};

export const onRequestCall = (payload) => {
    // Nếu listener online thì open popup
    getStore().dispatch({
        type: constants.CALL_REQUEST_CALL,
        payload: payload,
    });
};

export const onCancelRequestCall = (payload) => {
    // Nếu listener online thì open popup
    getStore().dispatch({
        type: constants.CALL_CLEAR,
        payload: payload,
    });
};

export const emitRejectCall = (payload) => {
    //  10. Listener hủy cuộc gọi
    getSocket().emit("listener-server-reject-call", payload);
};

export const emitAnswerCall = (payload) => {
    //  11. Listener nghe cuộc gọi
    getSocket().emit("listener-server-answer-call", payload);
};

export const onAnwserCall = (payload) => {
    // Nếu listener online thì open popup
    getStore().dispatch({
        type: constants.CALL_ANSWER_CALL,
        payload: payload,
    });
};

export const onRejectCall = (payload) => {
    // Nếu listener online thì open popup
    getStore().dispatch({
        type: constants.CALL_REJECT_CALL,
        payload: payload,
    });
};
