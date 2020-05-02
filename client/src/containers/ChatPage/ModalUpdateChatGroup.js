import React, { useState } from "react";
import { Upload, Icon, message, Modal, Button, Input, Row } from "antd";
import UpdateAvatar from "../UserPage/form/UpdateAvatar";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import actions from './actions'

function ModalUpdateChatGroup({ visible, doToggle, info }) {
    const dispatch = useDispatch();
    const record = useSelector(selectors.selectRecord);
    const [groupName, setGroupName] = useState(info.name)
    if(!info) return null
    const handleUpdateClick = () => {
        dispatch(actions.doChatGroupUpdate({ name: groupName, id: info.id }));
        doToggle();
    }

    return (
        <Modal
            title="Update"
            visible={visible}
            onOk={handleUpdateClick}
            okButtonProps={{
                disabled:
                    info.name === groupName || groupName.trim() === ""
                        ? true
                        : false,
            }}
            okText="Update"
            onCancel={doToggle}
        >
            <Row
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div>
                    <UpdateAvatar
                        picture={
                            info.picture
                                ? `${process.env.REACT_APP_STATIC_URI}/images/users/${info.picture}`
                                : null
                        }
                        action={`${process.env.REACT_APP_API_URI}/chat-group/avatar/${info.id}`}
                        onSuccess={(picture) =>
                            dispatch(
                                actions.doChatGroupChangeAvatar({
                                    picture,
                                    groupId: info.id,
                                })
                            )
                        }
                    />
                </div>
                <div style={{ width: "100%" }}>
                    <Input
                        defaultValue={info.name}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
            </Row>
        </Modal>
    );
}

export default ModalUpdateChatGroup;
