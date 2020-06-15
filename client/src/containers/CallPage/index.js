import React, { useRef, useEffect } from "react";
import { Button, Row, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import userSelectors from "../UserPage/selectors";
import { CallWrapper } from "./style/CallWrapper";
import AvatarCus from "../../components/AvatarCus";
import actions from "./actions";
import {
    emitCallerCancelRequestCall,
    emitAnswerCall,
    emitRejectCall,
    emitCallEnded,
} from "./socket";
import CallingModal from "./CallingModal";
import ContactingModal from "./ContactingModal";
import CallCanceledModal from "./CallCanceledModal";
import StreamModal from "./StreamModal";
import "webrtc-adapter";
import EnumDevicesModal from "./EnumDevicesModal";


function CallPage() {
    // console.log(navigator.getUserMedia);
    // console.log(navigator.webkitGetUserMedia);
    return (
        <>
            <StreamModal />
            {/* <Answer /> */}
            <ContactingModal />
            <CallingModal />
            <CallCanceledModal />
        </>
    );
}

export default CallPage;
