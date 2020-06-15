import React from 'react'
import { Video, Info, ArrowLeft } from "react-feather";
import actions from "./actions";
import selectors from "./selectors";
import callSelectors from '../CallPage/selectors'
import userSelectors from '../UserPage/selectors'
import { Button, Row, Layout } from "antd";
import AvatarCus from "../../components/AvatarCus";
import { useSelector, useDispatch } from 'react-redux';
import { emitCheckListenerStatus } from '../CallPage/socket';
import layoutActions from '../Layout/actions'
import layoutSelectors from '../Layout/selectors'
import {Link} from 'react-router-dom'
import { textAbstract } from '../shared/helper';
const { Header } = Layout;

function ChatContentHeader() {

    const dispatch = useDispatch();
    const record = useSelector(selectors.selectRecord);
    const currentUser = useSelector(userSelectors.selectCurrentUser)
    const peerId = useSelector(callSelectors.selectPeerId);
    const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);

    const handleCallVideoClick = () => {

        // b01. kiểm trả listener có online hay không 
        let caller = {
            id: currentUser.id,
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            picture: currentUser.picture,
        };
        emitCheckListenerStatus({ caller, listener: record.receiver });
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
                {isMobileDevice && (
                    <Link to="/">
                        <Button
                            style={{ border: "0", marginLeft: "-1.2rem" }}
                            shape="circle"
                            onClick={() => {
                                dispatch(actions.doClear());
                                dispatch(layoutActions.doShowLeftSidebar());
                            }}
                        >
                            <ArrowLeft size={20} strokeWidth={2} />
                        </Button>
                    </Link>
                )}

                <AvatarCus record={record ? record.receiver : null} />

                <span className="ml-3" style={{ lineHeight: "1" }}>
                    <span style={{ display: "block" }}>
                        {record
                            ? record.conversationType === "ChatGroup"
                                ? isMobileDevice
                                    ? textAbstract(record.receiver.name, 25)
                                    : record.receiver.name
                                : `${record.receiver.firstname} ${record.receiver.lastname}`
                            : ""}
                    </span>
                    {/* <small className="text-muted">
                        <span>Online</span>
                    </small> */}
                </span>
            </Row>
            <span className="mr-auto" />
            <div>
                {record && record.conversationType === "User" && (
                    <>
                        {/* <Button
                            shape="circle"
                            style={{ border: "0" }}
                            onClick={() => alert("Ban da nhan vao link")}
                        >
                            <Phone size={20} strokeWidth={1} />
                        </Button> */}
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
                    onClick={() =>
                        dispatch(layoutActions.doToggleRightSidebar())
                    }
                >
                    <Info size={20} strokeWidth={1} />
                </Button>
            </div>
        </Header>
    );
}

export default ChatContentHeader
