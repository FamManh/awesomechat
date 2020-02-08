import React, { useState } from "react";
import {
    Avatar,
    Input,
    Layout,
    List,
    Menu,
    Badge,
    Row,
    Button,
    Dropdown,
    Divider,
    Icon
} from "antd";
import { PhoneCall, Phone, Video, UserPlus, UserMinus } from "react-feather";
import Search from "antd/lib/input/Search";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import selectors from "../selectors";
import Text from "antd/lib/typography/Text";

const ContactList = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    const contacts = useSelector(selectors.selectContacts);
    const handleSearch = (term) => {
        dispatch(actions.list({term}));
    }

    const searchbar = (
        <div className="py-3 px-3" style={{ backgroundColor: "#fff" }}>
            <Search placeholder="Search contact" onSearch={handleSearch}/>
        </div>
    );

    const handleAddContactClick = (id) => {
        dispatch(actions.doCreate(id));
    }

    const handleRemoveContactClick = id => {
        dispatch(actions.doDestroy(id));
        
    };
    const renderContactsList = () => {
        return (
            <div>
                {contacts && !!contacts.length && (
                    <div
                        className="py-3 px-3"
                        style={{ backgroundColor: "#fff" }}
                    >
                        <Text>CONTACTS</Text>
                    </div>
                )}
                <List
                    className="scroll-y flex-1 bg-transparent"
                    itemLayout="horizontal"
                    dataSource={contacts}
                    renderItem={(item, index) => (
                        <List.Item
                            onClick={() => setSelectedIndex(index)}
                            className={`"border-0" border-0 px-4 py-3`}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot status="success">
                                        <Avatar
                                            size={48}
                                            style={{
                                                color: "#f56a00",
                                                backgroundColor: "#fde3cf"
                                            }}
                                        >
                                            {item.firstname[0].toUpperCase() +
                                                item.lastname[0].toUpperCase()}
                                        </Avatar>
                                    </Badge>
                                }
                                title={
                                    <span
                                        style={{
                                            display: "flex",
                                            width: "100%"
                                        }}
                                    >
                                        {item.firstname + " " + item.lastname}
                                    </span>
                                }
                                description={
                                    <>
                                        <a
                                            href="#"
                                            style={{ margin: "0px 3px" }}
                                            onClick={() =>
                                                handleAddContactClick(item.id)
                                            }
                                        >
                                            <UserPlus
                                                size={20}
                                                strokeWidth={2}
                                            />
                                        </a>
                                        <a
                                            href="#"
                                            style={{ margin: "0px 3px" }}
                                            onClick={() =>
                                                handleRemoveContactClick(
                                                    item.id
                                                )
                                            }
                                        >
                                            <UserMinus
                                                size={20}
                                                strokeWidth={2}
                                            />
                                        </a>
                                        {/* <a href="#" style={{ margin: "0px 3px" }}>
                                        <Phone size={20} strokeWidth={2} />
                                    </a>
                                    <a href="#" style={{ margin: "0px 3px" }}>
                                        <Video size={20} strokeWidth={2} />
                                    </a> */}
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    };
    return (
        <>
            {searchbar}
            {renderContactsList()}
        </>
    );
};
export default ContactList;
