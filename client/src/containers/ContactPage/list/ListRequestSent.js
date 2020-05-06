import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import selectors from "../selectors";
import AvatarCus from "../../../components/AvatarCus";
import WrapperListContact from "../style/WrapperListContact";

function ListRequestSent() {
    const dispatch = useDispatch();
    const requestsSent = useSelector(selectors.selectRequestsSent);
    const handleDeleteClick = (userInfo) => {
        dispatch(actions.doDestroyRequestSent(userInfo));
    };
    const menu = (member) => {
        return (
            <Menu>
                <Menu.Item key="1" onClick={() => handleDeleteClick(member)}>
                    Remove
                </Menu.Item>
            </Menu>
        );
    };

    const renderList = (users) => {
        return users.map((user, key) => (
            <div className="list-item list-item-hover" key={key}>
                <div>
                    <AvatarCus className="avatar" record={user} />
                    {`${user.firstname} ${user.lastname}`}
                </div>
                <div style={{ lineHeight: "40px", marginRight: "5px" }}>
                    <Dropdown overlay={() => menu(user)} trigger={["click"]}>
                        <Button
                            style={{ border: "0px" }}
                            shape="circle"
                            icon="ellipsis"
                        ></Button>
                    </Dropdown>
                </div>
            </div>
        ));
    };
    return <WrapperListContact>{renderList(requestsSent)}</WrapperListContact>;
}

export default ListRequestSent;
