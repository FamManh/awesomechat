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

const Contacting = () => {
    const dispatch = useDispatch();

    const callStatus = useSelector(selectors.selectStatus);
    const caller = useSelector(selectors.selectCaller);
    const listener = useSelector(selectors.selectListener);

    const onCancelRequestCall = () => {
        emitCallerCancelRequestCall({ caller, listener });
        dispatch(actions.doClear());
    };

    return (
        <Modal
            visible={callStatus === "contacting"}
            footer={null}
            closable={false}
        >
            <Row
                type="flex"
                align="middle"
                justify="center"
                className="px-3 bg-white mh-page"
                style={{ minHeight: "80%", minWidth: "80%" }}
            >
                <div
                    style={{
                        maxWidth: "400px",
                        minWidth: "300px",
                        textAlign: "center",
                    }}
                >
                    <AvatarCus record={listener} size={100} />
                    <p style={{ marginTop: "15px" }}>
                        Contacting <strong>{listener.firstname}</strong> ...
                    </p>
                    <div>
                        <Button
                            icon="phone"
                            type="danger"
                            shape="round"
                            size="large"
                            onClick={onCancelRequestCall}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Row>
        </Modal>
    );
};

const Calling = () => {
    const dispatch = useDispatch();

    const callStatus = useSelector(selectors.selectStatus);
    const caller = useSelector(selectors.selectCaller);
    const listener = useSelector(selectors.selectListener);
    const peerId = useSelector(selectors.selectPeerId);

    const onAnswerCall = () => {
        emitAnswerCall({ caller, listener, peerId });
        // dispatch(actions.doClear());
    };

    const onRejectCall = () => {
        emitRejectCall({ caller, listener });
        dispatch(actions.doClear());
    };

    return (
        <Modal
            visible={callStatus === "calling"}
            footer={null}
            closable={false}
        >
            <Row
                type="flex"
                align="middle"
                justify="center"
                className="px-3 bg-white mh-page"
                style={{ minHeight: "80%", minWidth: "80%" }}
            >
                <div
                    style={{
                        maxWidth: "400px",
                        minWidth: "300px",
                        textAlign: "center",
                    }}
                >
                    <AvatarCus record={caller} size={100} />
                    <p style={{ marginTop: "15px" }}>
                        <strong>{caller.firstname}</strong> is calling ...
                    </p>
                    <div>
                        <Button
                            icon="phone"
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={onAnswerCall}
                            style={{ marginRight: "7px" }}
                        >
                            Answer
                        </Button>
                        <Button
                            icon="phone"
                            type="danger"
                            shape="round"
                            size="large"
                            onClick={onRejectCall}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Row>
        </Modal>
    );
};

const Reject = () => {
    const dispatch = useDispatch();

    const callStatus = useSelector(selectors.selectStatus);
    const listener = useSelector(selectors.selectListener);

    return (
        <Modal
            visible={callStatus === "rejected"}
            footer={null}
            closable={false}
        >
            <Row
                type="flex"
                align="middle"
                justify="center"
                className="px-3 bg-white mh-page"
                style={{ minHeight: "80%", minWidth: "80%" }}
            >
                <div
                    style={{
                        maxWidth: "400px",
                        minWidth: "300px",
                        textAlign: "center",
                    }}
                >
                    <AvatarCus record={listener} size={100} />
                    <p style={{ marginTop: "15px" }}>
                        <strong>{listener.firstname}</strong> is busy
                    </p>
                    <div>
                        <Button
                            icon="close"
                            shape="round"
                            size="large"
                            onClick={() => dispatch(actions.doClear())}
                            style={{ marginRight: "7px" }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Row>
        </Modal>
    );
};

const Answer = () => {
    const dispatch = useDispatch();

    const callStatus = useSelector(selectors.selectStatus);

    return (
        <Modal visible={callStatus === "answer"} footer={null} closable={false}>
            <Row
                type="flex"
                align="middle"
                justify="center"
                className="px-3 bg-white mh-page"
                style={{ minHeight: "80%", minWidth: "80%" }}
            >
                <div
                    style={{
                        maxWidth: "400px",
                        minWidth: "300px",
                        textAlign: "center",
                    }}
                >
                    <p style={{ marginTop: "30px" }}>Answer HAHAHAHHAHHA</p>
                    <div>
                        <Button
                            icon="close"
                            shape="round"
                            size="large"
                            onClick={() => dispatch(actions.doClear())}
                            style={{ marginRight: "7px" }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Row>
        </Modal>
    );
};

const VideoStream = () => {
    let callerVideoRef = useRef();
    let listenerVideoRef = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const callStatus = useSelector(selectors.selectStatus);
    const caller = useSelector(selectors.selectCaller);
    const listener = useSelector(selectors.selectListener);
    const localStream = useSelector(selectors.selectLocalStream);
    const remoteStream = useSelector(selectors.selectRemoteStream);

    useEffect(() => {
        if (
            callerVideoRef.current ||
            (callerVideoRef.current &&
                callerVideoRef.current.srcObject !== localStream)
        ) {
            callerVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);
    useEffect(() => {
        if (
            listenerVideoRef.current ||
            (listenerVideoRef.current &&
                listenerVideoRef.current.srcObject !== remoteStream)
        ) {
            listenerVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const handleCallEnded = () => {
        const remoteId = listener.id === currentUser.id ? caller.id : listener.id
        emitCallEnded({ id: remoteId });
        dispatch(actions.doCallEnded());
    };

    return (
        <Modal
            visible={callStatus === "streaming"}
            footer={null}
            closable={false}
            width={"100%"}
            height={"100%"}
            centered={true}
            bodyStyle={{
                padding: 0,
                width: "100vw",
                height: "100vh",
                overflowY: "hidden",
            }}
        >
            <CallWrapper>
                <div className="action-buttons">
                    <Button
                        icon="camera"
                        type="primary"
                        shape="circle"
                        size="large"
                    ></Button>
                    <Button
                        icon="audio"
                        type="primary"
                        shape="circle"
                        size="large"
                    ></Button>
                    <Button
                        icon="phone"
                        type="danger"
                        shape="circle"
                        size="large"
                        onClick={handleCallEnded}
                    ></Button>
                </div>
                <video
                    className="caller-video"
                    ref={callerVideoRef}
                    autoPlay={true}
                    muted={false}
                ></video>

                <video
                    className="listener-video"
                    ref={listenerVideoRef}
                    autoPlay={true}
                ></video>
            </CallWrapper>
        </Modal>
    );
};

function CallPage() {
    return (
        <>
            <VideoStream />
            <Answer />
            <Contacting />
            <Calling />
            <Reject />
        </>
    );
}

export default CallPage;
