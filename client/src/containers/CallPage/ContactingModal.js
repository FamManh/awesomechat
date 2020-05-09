import React from "react";
import { useDispatch, useSelector } from "react-redux";
import selectors from "./selectors";
import { emitAnswerCall, emitRejectCall, emitCallerCancelRequestCall } from "./socket";
import actions from "./actions";
import { Modal, Row, Button } from "antd";
import AvatarCus from "../../components/AvatarCus";

const ContactingModal = () => {
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
export default ContactingModal
