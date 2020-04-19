import React from 'react'
import { Phone, Video, Info } from "react-feather";
import actions from "./actions";
import selectors from "./selectors";
import callSelectors from '../CallPage/selectors'
import userSelectors from '../UserPage/selectors'
import { Button, Row, Layout } from "antd";
import AvatarCus from "../../components/AvatarCus";
import { useSelector, useDispatch } from 'react-redux';
import { emitCheckListenerStatus } from '../CallPage/socket';

const { Header } = Layout;

function ChatContentHeader() {

    const dispatch = useDispatch();
    const record = useSelector(selectors.selectRecord);
    const currentUser = useSelector(userSelectors.selectCurrentUser)
    const peerId = useSelector(callSelectors.selectPeerId);
    const handleCallVideoClick = () => {

        // b01. kiểm trả listener có online hay không 
        let caller = {
            id: currentUser.id,
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            picture: currentUser.picture,
        };
        emitCheckListenerStatus({ caller, listener: record.receiver });
        // window.open(
        //     "/call",
        //     "sdfasdfasdf",
        //     "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-10000"
        // );
    }

    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                padding: "0.3rem 2rem",
                zIndex: "1",
                boxShadow:
                    "0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02)",
                height: "auto",
                lineHeight: "auto",
                backgroundColor: "#fff",
            }}
        >
            <Row type="flex" align="middle">
                <AvatarCus record={record ? record.receiver : null} />

                <span className="ml-3" style={{ lineHeight: "1" }}>
                    <span style={{ display: "block" }}>
                        {record
                            ? record.conversationType === "ChatGroup"
                                ? record.receiver.name
                                : `${record.receiver.firstname} ${record.receiver.lastname}`
                            : ""}
                    </span>
                    <small className="text-muted">
                        <span>Online</span>
                    </small>
                </span>
            </Row>
            <span className="mr-auto" />
            <div>
                {record && record.conversationType === "User" && peerId && (
                    <>
                        <Button
                            shape="circle"
                            style={{ border: "0" }}
                            onClick={() => alert("Ban da nhan vao link")}
                        >
                            <Phone size={20} strokeWidth={1} />
                        </Button>
                        <Button
                            style={{ border: "0" }}
                            shape="circle"
                            onClick={handleCallVideoClick}
                        >
                            <Video size={20} strokeWidth={1} />
                        </Button>
                    </>
                )}
                <Button
                    style={{ border: "0" }}
                    shape="circle"
                    onClick={() => dispatch(actions.doToggleRightSidebar())}
                >
                    <Info size={20} strokeWidth={1} />
                </Button>
            </div>
        </Header>
    );
}

export default ChatContentHeader
