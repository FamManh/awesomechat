import React, { useState, useEffect } from "react";
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
    Icon,
    Collapse
} from "antd";
import { PhoneCall, Phone, Video, UserPlus, UserMinus } from "react-feather";
import Search from "antd/lib/input/Search";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import selectors from "../selectors";
import Text from "antd/lib/typography/Text";

const { Panel } = Collapse;

const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
};
const ContactList = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    const contacts = useSelector(selectors.selectContacts);
    const requests = useSelector(selectors.selectRequests);
    const requestsSent = useSelector(selectors.selectRequestsSent);

    const handleSearch = term => {
        dispatch(actions.list({ term }));
    };

    const searchbar = (
        <div className="py-3 px-3" style={{ backgroundColor: "#fff" }}>
            <Search placeholder="Search contact" onSearch={handleSearch} />
        </div>
    );

    const handleAddContactClick = userInfo => {
        dispatch(actions.doCreate(userInfo));
    };

    const handleRemoveContactClick = userInfo => {
        dispatch(actions.doDestroyContact(userInfo));
    };

    const handleConfirmContactClick = userInfo => {
        dispatch(actions.doUpdate(userInfo));
    };

    const renderContactsList = () => {
        return (
            <div>
                <List
                    className="scroll-y flex-1 bg-transparent"
                    itemLayout="horizontal"
                    dataSource={contacts}
                    renderItem={(item, index) => (
                        <List.Item
                            onClick={() => setSelectedIndex(index)}
                            className={`"border-0" border-0 px-0 py-3`}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot status="success">
                                        {item.picture ? (
                                            <Avatar
                                                src={
                                                    process.env
                                                        .REACT_APP_STATIC_URI +
                                                    "/" +
                                                    item.picture
                                                }
                                            />
                                        ) : (
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
                                        )}
                                    </Badge>
                                }
                                title={
                                    <>
                                        <span
                                            style={{
                                                display: "flex",
                                                width: "100%"
                                            }}
                                        >
                                            {item.firstname +
                                                " " +
                                                item.lastname}
                                        </span>
                                    </>
                                }
                                description={
                                    <>
                                        <Button
                                            shape="round"
                                            onClick={() =>
                                                dispatch(
                                                    actions.doDestroyContact(
                                                        item
                                                    )
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    };
    const renderRequestsList = () => {
        return (
            <div>
                <List
                    className="scroll-y flex-1 bg-transparent"
                    itemLayout="horizontal"
                    dataSource={requests}
                    renderItem={(item, index) => (
                        <List.Item
                            onClick={() => setSelectedIndex(index)}
                            className={`"border-0" border-0 px-0 py-3`}
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
                                        <Button
                                            type="primary"
                                            shape="round"
                                            onClick={() =>
                                                handleConfirmContactClick(item)
                                            }
                                        >
                                            Confirm
                                        </Button>
                                        <Button
                                            shape="round"
                                            onClick={() =>
                                                dispatch(actions.doDestroyRequest(item))
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    };
    const renderRequestsSentList = () => {
        return (
            <div>
                <List
                    className="scroll-y flex-1 bg-transparent"
                    itemLayout="horizontal"
                    dataSource={requestsSent}
                    renderItem={(item, index) => (
                        <List.Item
                            onClick={() => setSelectedIndex(index)}
                            className={`"border-0" border-0 px-0 py-3`}
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
                                        <Button
                                            shape="round"
                                            onClick={() =>
                                                dispatch(
                                                    actions.doDestroyRequestSent(
                                                        item
                                                    )
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    };

    useEffect(() => {
        dispatch(actions.listContacts());
        dispatch(actions.listRequests());
        dispatch(actions.listRequestsSent());
        
        return () => {};
    }, []);

    return (
        <>
            {/* {searchbar} */}
            <Collapse
                style={{ overflowY: "auto" }}
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                    <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
            >
                <Panel
                    header={`Contact (${contacts.length})`}
                    key="1"
                    style={customPanelStyle}
                >
                    {renderContactsList()}
                </Panel>
                <Panel
                    header={`Request (${requests.length})`}
                    key="2"
                    style={customPanelStyle}
                >
                    {renderRequestsList()}
                </Panel>
                <Panel
                    header={`Request sent (${requestsSent.length})`}
                    key="3"
                    style={customPanelStyle}
                >
                    {renderRequestsSentList()}
                </Panel>
            </Collapse>
        </>
    );
};
export default ContactList;
