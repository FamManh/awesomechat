import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import selectors from "../selectors";
import { Link } from "react-router-dom";
import AvatarCus from "../../../components/AvatarCus";
import WrapperListContact from "../style/WrapperListContact";


function ListContact() {
    const dispatch = useDispatch();
    const contacts = useSelector(selectors.selectContacts);
    const handleDeleteClick = (userInfo) => {
        dispatch(actions.doDestroyContact(userInfo));
    };
    const menu = (member) => {
        return (
            <Menu>
                <Menu.Item key="0">
                    <Link to={`/m/${member.id}`}>Message</Link>
                </Menu.Item>
                <Menu.Item
                    key="1"
                    onClick={() => handleDeleteClick(member)}
                >
                    Remove
                </Menu.Item>
            </Menu>
        );
    };

    const renderList = (users) => {
        return users.map((user, key) => (
            <Link to={`/m/${user.id}`} key={key}>
                <div className="list-item list-item-hover">
                    <div>
                        <AvatarCus className="avatar" record={user} />
                        {`${user.firstname} ${user.lastname}`}
                    </div>
                    <div style={{ lineHeight: "40px", marginRight: "5px" }}>
                        <Dropdown
                            overlay={() => menu(user)}
                            trigger={["click"]}
                        >
                            <Button
                                style={{ border: "0px" }}
                                shape="circle"
                                icon="ellipsis"
                            ></Button>
                        </Dropdown>
                    </div>
                </div>
            </Link>
        ));
    };
    return (
        <WrapperListContact>{renderList(contacts)}</WrapperListContact>
    );
}

export default ListContact
