import React, { useState, useEffect } from "react";
import { Modal, Input, Divider, Icon } from "antd";
import userSelectors from "../UserPage/selectors";
import { useSelector, useDispatch } from "react-redux";
import AvatarCus from "../../components/AvatarCus";
import actions from "./actions";
import contactActions from "../ContactPage/actions";
import contactSelectors from "../ContactPage/selectors";
import ListUser from "./styles/ListUser";

function ModalCreateGroupchat({ visible, doToggle }) {
    let users = useSelector(contactSelectors.selectContacts);
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const [newMembers, setNewMembers] = useState([]);
    const [groupName, setGroupName] = useState("Group name");
    const dispatch = useDispatch();

    const idNewMemberAdded = (userId) => {
        // Đây có phải là new member hay không?
        const memberExists = newMembers.find((item) => item.id === userId);
        return memberExists ? true : false;
    };
    const renderUsers = (users) => {
        return users.map((user, key) => (
            <div
                className="list-item list-item-hover"
                key={key}
                onClick={() => {
                    if (!idNewMemberAdded(user.id)) {
                        setNewMembers([...newMembers, user]);
                    } else {
                        let tempNewMembers = newMembers;
                        tempNewMembers = tempNewMembers.filter(
                            (item) => item.id !== user.id
                        );
                        setNewMembers(tempNewMembers);
                    }
                }}
            >
                <div>
                    <AvatarCus className="avatar" record={user} />
                    {`${user.firstname} ${user.lastname}`}
                </div>
                <div style={{ lineHeight: "40px", marginRight: "5px" }}>
                    {idNewMemberAdded(user.id) && (
                        <Icon type="check" style={{ color: "#1890ff" }} />
                    )}
                </div>
            </div>
        ));
    };

    const onCreateGroup = () => {
        if (newMembers.length > 1) {
            let membersListId = newMembers.map((item) => item.id);
            dispatch(
                actions.doCreateGroup({
                    name: groupName,
                    members: membersListId,
                })
            );

            setGroupName("Group name");
            setNewMembers([]);
        }
        doToggle();
    };
    useEffect(() => {
        dispatch(contactActions.listContacts());
    }, []);
    if (!currentUser) return <span></span>;
    return (
        <div>
            <Modal
                title="Create Group Chat"
                visible={visible}
                onOk={onCreateGroup}
                okButtonProps={{
                    disabled:
                        newMembers.length > 1 && groupName.trim().length > 0
                            ? false
                            : true,
                }}
                okText="Create group"
                onCancel={doToggle}
            >
                <div
                    style={{ minHeight: "300px", maxHeight: "400px" }}
                    className="scroll-y"
                >
                    <Input
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter name of group"
                    />
                    <Divider orientation="left">People </Divider>
                    {/* <AutoComplete
                        // dataSource={Users}
                        style={{ width: "100%" }}
                        onSelect={onSelect}
                        onSearch={onSearch}
                        placeholder="Search"
                        onChange={(value) => setTerm(value)}
                        value={term}
                    >
                        {children}
                    </AutoComplete> */}
                    {/* {renderList()} */}
                    <ListUser style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {renderUsers(users)}
                    </ListUser>
                </div>
            </Modal>
        </div>
    );
}

export default ModalCreateGroupchat;
