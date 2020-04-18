import React, { useRef, useState, useEffect } from "react";
import MediaHandler from "./MediaHandler";
import { Button, Row, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import userSelectors from "../UserPage/selectors";
import { CallWrapper } from "./style/CallWrapper";
import AvatarCus from "../../components/AvatarCus";
import actions from "./actions";
import { emitCallerCancelRequestCall, emitAnswerCall, emitRejectCall } from "./socket";

const Contacting = () => {
    const dispatch = useDispatch();

    const callStatus = useSelector(selectors.selectStatus);
    const caller = useSelector(selectors.selectCaller);
    const listener = useSelector(selectors.selectListener);

    const onCancelRequestCall = () => {
        emitCallerCancelRequestCall({ caller, listener });
        dispatch(actions.doClear())
    }

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

    const onAnswerCall = () => {
        emitAnswerCall({ caller, listener });
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
    const caller = useSelector(selectors.selectCaller);
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
                            onClick={()=>dispatch(actions.doClear())}
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
    const caller = useSelector(selectors.selectCaller);
    const listener = useSelector(selectors.selectListener);

    return (
        <Modal
            visible={callStatus === "answer"}
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
                    <p style={{ marginTop: "30px" }}>
                        Answer HAHAHAHHAHHA
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

function CallPage() {
    const caller = useSelector(selectors.selectCaller);
    const listener = useSelector(selectors.selectListener);

    return (
        <>
            <Contacting />
            <Calling/>
            <Reject/>
            <Answer/>
        </>
    );
    // let callerVideo = useRef();
    // let listenerVideo = useRef();

    // const currentUser = useSelector(userSelectors.selectCurrentUser)
    // console.log(currentUser);
    // const [hasMedia, setHasMedia] = useState(false);
    // const [otherUserId, setOtherUserId] = useState(null);

    // const mediaHandler = new MediaHandler();

    // useEffect(()=>{
    //     console.log(window.location);
    //     const p = new Peer({
    //         initiator: window.location.hash === "#1",
    //         trickle: false
    //     });
    //     p.on("signal", token => console.log(token));
    // }, [])

    // useEffect(() => {
    //     mediaHandler.getPermissions().then(stream => {
    //         setHasMedia(true);
    //         try {
    //             callerVideo.current.srcObject = stream;
    //         } catch (error) {
    //             console.log(error);
    //             callerVideo.current.src = URL.createObjectURL(stream);
    //         }
    //     });
    // });

    // return (
    //     <CallWrapper>
    //         <div className="action-buttons">
    //             <Button
    //                 icon="camera"
    //                 type="primary"
    //                 shape="circle"
    //                 size="large"
    //             ></Button>
    //             <Button
    //                 icon="audio"
    //                 type="primary"
    //                 shape="circle"
    //                 size="large"
    //             ></Button>
    //             <Button
    //                 icon="phone"
    //                 type="danger"
    //                 shape="circle"
    //                 size="large"
    //             ></Button>
    //         </div>
    //         <img
    //             className="listener-video"
    //             src="https://i.ytimg.com/vi/22MDXte1nYs/maxresdefault.jpg"
    //         />
    //         <video className="caller-video" ref={callerVideo} autoPlay={true}></video>
    //     </CallWrapper>
    // );
}

export default CallPage;
