import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import userSelectors from "../UserPage/selectors";
import {
    Modal,
    Icon,
} from "antd";
import ListUser from "./styles/ListUser";
import AvatarCus from "../../components/AvatarCus";
import actions from "./actions";
import contactActions from '../ContactPage/actions'
import contactSelectors from '../ContactPage/selectors'

function ModalAddMemberToGroup({ visible, doToggle }) {
    const dispatch = useDispatch();
    const record = useSelector(selectors.selectRecord);
    const users = useSelector(contactSelectors.selectContacts);
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const [newMembers, setNewMembers] = useState([]);

    const isMemberAdded = (userId) => {
        // Đây có phải là member group hay không ?
        const memberExists = record.receiver.members.find(
            (item) => item.id === userId
        );
        return memberExists ? true : false;
    };

    const idNewMemberAdded = (userId) => {
        // Đây có phải là new member hay không?
        const memberExists = newMembers.find((item) => item.id === userId);
        return memberExists ? true : false;
    };

    const handleOnOkClick = () => {
        let notifMessage = ""
        newMembers.forEach((item, index) => {
            if (index > 0) notifMessage += ", ";
            notifMessage += item.firstname + " " + item.lastname;
        });
        dispatch(
            actions.doAddNewMembers({
                groupId: record.receiver.id,
                members: newMembers,
                message: `${
                    currentUser.firstname + " " + currentUser.lastname
                } added ${notifMessage} to the group.`
            })
        );
        
      
        doToggle();
    };

    useEffect(() => {
        dispatch(contactActions.listContacts())
    }, []);

    const renderUsers = (users) => {
        return users.map((user, key) => (
            <div
                className="list-item list-item-hover"
                key={key}
                onClick={() => {
                    if (!isMemberAdded(user.id)) {
                        if (!idNewMemberAdded(user.id)) {
                            setNewMembers([...newMembers, user]);
                        } else {
                            let tempNewMembers = newMembers;
                            tempNewMembers = tempNewMembers.filter(
                                (item) => item.id !== user.id
                            );
                            setNewMembers(tempNewMembers);
                        }
                    }
                }}
            >
                <div>
                    <AvatarCus className="avatar" record={user} />
                    {`${user.firstname} ${user.lastname}`}
                </div>
                <div style={{ lineHeight: "40px", marginRight: "5px" }}>
                    {user.id === currentUser.id
                        ? "You"
                        : isMemberAdded(user.id)
                        ? "Added"
                        : null}
                    {idNewMemberAdded(user.id) && (
                        <Icon type="check" style={{ color: "#1890ff" }} />
                    )}
                </div>
            </div>
        ));
    };

    return (
        <Modal
            title="Add people"
            visible={visible}
            onOk={handleOnOkClick}
            okButtonProps={{
                disabled: newMembers.length > 0 ? false : true,
            }}
            okText="Add"
            onCancel={doToggle}
        >
            <ListUser style={{ maxHeight: "400px", overflowY: "auto" }}>
                {renderUsers(users)}
            </ListUser>
        </Modal>
    );
}

export default ModalAddMemberToGroup;
