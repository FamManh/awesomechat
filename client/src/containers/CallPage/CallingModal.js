import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import selectors from './selectors';
import { emitAnswerCall, emitRejectCall } from './socket';
import actions from './actions';
import { Modal, Row, Button } from 'antd';
import AvatarCus from '../../components/AvatarCus';

const CallingModal = () => {
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
export default CallingModal
