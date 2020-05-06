import React, { useState } from "react";
import { Modal, Input, Row } from "antd";
import UpdateAvatar from "../UserPage/form/UpdateAvatar";
import { useSelector, useDispatch } from "react-redux";
import actions from './actions'
import userSelectors from '../UserPage/selectors'
function ModalUpdateChatGroup({ visible, doToggle, info }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(userSelectors.selectCurrentUser)
    const [groupName, setGroupName] = useState(info.name)
  
    if(!info) return null
    const handleUpdateClick = () => {
        dispatch(actions.doChatGroupUpdate({ name: groupName, id: info.id, message: `${currentUser.firstname + " " + currentUser.lastname} named the conversation: ${groupName}.` }));
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
                                    message: `${currentUser.firstname + " " + currentUser.lastname} changed the group photo.`
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
