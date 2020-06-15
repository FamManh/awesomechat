import getSocket from "../rootSocket";
import getStore from "../configureStore";
import Message from "../shared/message";
import { Modal } from "antd";
import constants from "./constants";
import peerjs from "peerjs";
import callActions from "../CallPage/actions";

// let state = getStore() && getStore().getState();
let peer = null;
 
export const  initPeer = (p) => {
    peer = p
}

// emit sự kiện kiểm tra status của listener
export const emitCheckListenerStatus = (payload) => {
    getSocket().emit("caller-server-check-listener-status", payload);
};

// lắng nghe sự kiện status listener
export const onListenerOffline = (payload) => {
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

// lắng nghe sự kiện yêu cầu peerid
export const onRequestPeerId = (payload) => {
    if (!peer) return;
    // showModalCallRequest(payload.caller)
    // lắng nghe yêu cầu peerid
    let state = getStore().getState();
    getSocket().emit("listener-server-listener-peer-id", {
        ...payload,
        peerId: state.call.peerId,
    });
};

// lắng nghe sự kiện nhận peerid của listener từ server
export const onResponeListenerPeerId = (payload) => {
    // b06. Yêu cầu call
    getSocket().emit("caller-server-request-call", payload);
};

// emit sự kiện caller hủy cuộc gọi
export const emitCallerCancelRequestCall = (payload) => {
    // 07. Người gọi hủy cuộc gọi
    getSocket().emit("caller-server-cancel-request-call", payload);
};

// lắng nghe sự kiện yêu cầu cuộc gọi tới
export const onRequestCall = (payload) => {
    // Nếu listener online thì open popup
    getStore().dispatch({
        type: constants.CALL_REQUEST_CALL,
        payload: payload,
    });
};

// lắng nghe sự kiện caller hủy cuộc gọi
export const onCancelRequestCall = (payload) => {
    getStore().dispatch({
        type: constants.CALL_CLEAR,
        payload: payload,
    });
};

// emmit sự kiện listener từ chối cuộc gọi
export const emitRejectCall = (payload) => {
    //  10. Listener hủy cuộc gọi
    getSocket().emit("listener-server-reject-call", payload);
};

// emit sự kiện trả lời cuộc gọi
export const emitAnswerCall = (payload) => {
    //  11. Listener nghe cuộc gọi
    getSocket().emit("listener-server-answer-call", payload);
};

// lắng nghe sự kiện nhận cuộc gọi
export const onCallerAnwserCall = async(payload) => {
    let stream = null;
    getStore().dispatch({
        type: constants.CALL_CALLER_ANSWER,
        payload: payload,
    });
    try{
        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        let call = peer.call(payload.peerId, stream);
        getStore().dispatch({
            type: constants.CALL_LOCAL_STREAM,
            payload: stream,
        });
        call.on("stream", function (remoteStream) {
            getStore().dispatch({
                type: constants.CALL_REMOTE_STREAM,
                payload: remoteStream,
            });
        });
    }catch(error){
        console.log("Failed to get local stream", error);
        Modal.error({ title: "Error", content: error.toString() });
    }
};

// lắng nghe sự kiện listener nhận cuộc gọi
export const onListenerAnwserCall = (payload) => {
    if (!peer) return;
    let stream = null;
    getStore().dispatch({
        type: constants.CALL_LISTENER_ANSWER,
        payload: payload,
    });
  
    peer.on("call", async function (call) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            getStore().dispatch({
                type: constants.CALL_LOCAL_STREAM,
                payload: stream,
            });
            call.answer(stream); // Answer the call with an A/V stream.
            call.on("stream", function (remoteStream) {
                // Show stream in some video/canvas element.
                getStore().dispatch({
                    type: constants.CALL_REMOTE_STREAM,
                    payload: remoteStream,
                });
            });
        } catch (error) {
            console.log("Failed to get local stream", error);
            Modal.error({
                title: "Error",
                content: error.toString(),
            });
        }
      
    });
};

// lắng nghe sự kiện listener từ chối cuộc gọi
export const onRejectCall = (payload) => {
    getStore().dispatch({
        type: constants.CALL_REJECT_CALL,
        payload: payload,
    });
};

// emit sự kiện kết thúc cuộc gọi
export const emitCallEnded = (payload) => {
    getSocket().emit("--server-call-ended", payload);
};

// lắng nghe sự kiện 1 trong 2 user kết thúc cuộc gọi .
export const onCallEnded = () => {
    Modal.info({ content: "Call ended" });
    getStore().dispatch({
        type: constants.CALL_CALL_ENDED,
    });
};
