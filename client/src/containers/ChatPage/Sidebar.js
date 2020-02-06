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
    Dropdown
} from "antd";
import {
    CheckCircle,
    Heart,
    RefreshCcw,
    Star,
    Phone,
    Video,
    UserPlus,
    MoreHorizontal,
    Users,
    MessageCircle
} from "react-feather";
import authActions from '../AuthPage/actions';
const { Sider, Header } = Layout;
const { Search } = Input;

function ChatSidebar() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const MockContacts = [
        {
            name: "Bobby Sullivan",
            status: "Mollis Nullam",
            avatar: (
                <Badge dot status="success">
                    <Avatar
                        size={48}
                        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                    >
                        B
                    </Avatar>
                </Badge>
            )
        },
        {
            name: "Bryan Morgan",
            status: "Risus Justo",
            avatar: <Avatar size={48} src="/static/images/face4.jpg" />
        },
        {
            name: "Phillip Caroll",
            status: "Mollis Nibh",
            avatar: (
                <Avatar
                    size={48}
                    style={{
                        color: "rgb(34, 245, 0)",
                        backgroundColor: "rgb(207, 253, 219)"
                    }}
                >
                    P
                </Avatar>
            )
        },
        {
            name: "Brandon Boyd",
            status: "Dolor Mattis",
            avatar: <Avatar size={48} src="/static/images/face1.jpg" />
        },
        {
            name: "Laura Mason",
            status: "Commodo Amet",
            avatar: <Avatar size={48} src="/static/images/face3.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Barbara Chapman",
            status: "Tellus Sollicitudin",
            avatar: <Avatar size={48} src="/static/images/face2.jpg" />
        },
        {
            name: "Doris Baker",
            status: "Nibh Adipiscing",
            avatar: <Avatar size={48} src="/static/images/face1.jpg" />
        },
        {
            name: "Doris Marshall",
            status: "Tellus Sollicitudin",
            avatar: (
                <Avatar
                    size={48}
                    style={{
                        color: "rgb(143, 0, 245)",
                        backgroundColor: "rgb(214, 207, 253)"
                    }}
                >
                    D
                </Avatar>
            )
        },
        {
            name: "Andrew Weber",
            status: "Nibh Adipiscing",
            avatar: <Avatar size={48} src="/static/images/face4.jpg" />
        },
        {
            name: "John Doe",
            status: "Nibh Adipiscing",
            avatar: <Avatar size={48} src="/static/images/face5.jpg" />
        }
    ];

    const messageFooter = (
        <div className="py-3 px-3" style={{ backgroundColor: "#fff" }}>
            <Search placeholder="Search contact" />
        </div>
    );

    const messagesSidebar = (
        <List
            className="scroll-y flex-1 bg-transparent"
            itemLayout="horizontal"
            dataSource={MockContacts}
            renderItem={(item, index) => (
                <List.Item
                    onClick={() => setSelectedIndex(index)}
                    style={{
                        backgroundColor:
                            selectedIndex === index ? "#e6f7ff" : "#fff"
                    }}
                    className={`${
                        selectedIndex === index ? "" : "border-0"
                    } border-0 px-4 py-3`}
                >
                    <List.Item.Meta
                        avatar={item.avatar}
                        title={
                            <small
                                style={{
                                    display: "flex",
                                    width: "100%"
                                }}
                            >
                                <span
                                    className={`${
                                        selectedIndex === index
                                            ? "ant-menu-item-selected"
                                            : ""
                                    } `}
                                >
                                    {item.name}
                                </span>
                            </small>
                        }
                        description={<span>{item.status}</span>}
                    />
                </List.Item>
            )}
        />
    );

    const messageHeader = (
        <Menu mode="horizontal" className="border-0">
            <Menu.Item key="read" style={{ width: "50%", textAlign: "center" }}>
                <a href="javascript:;">
                    <MessageCircle size={20} strokeWidth={1} />
                </a>
            </Menu.Item>
            <Menu.Item
                key="favorite"
                style={{ width: "50%", textAlign: "center" }}
            >
                <a href="javascript:;">
                    <Users size={20} strokeWidth={1} />
                </a>
            </Menu.Item>
        </Menu>
    );

    const menu = (
        <Menu style={{width: "150px"}}>
            <Menu.Item key="0" onClick={authActions.doSignout}>
                <a>Sign out</a>
            </Menu.Item>
            <Menu.Item key="0">
                <a>Settings</a>
            </Menu.Item>
        </Menu>
    );

    const userInfo = (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                padding: "0.3rem 1.5rem",
                zIndex: "1",
                boxShadow:
                    "0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02)",
                height: "auto",
                lineHeight: "auto",
                backgroundColor: "#fff"
            }}
        >
            <Row type="flex" align="middle">
                <Avatar
                    shape="circle"
                    size={40}
                    src="/static/images/avatar.jpg"
                />
                <span className="ml-3" style={{ lineHeight: "1" }}>
                    <span style={{ display: "block" }}>Manh Pham</span>
                    <small className="text-muted">
                        <span>Online</span>
                    </small>
                </span>
            </Row>
            <span className="mr-auto" />
            <div>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button
                        className="ant-dropdown-link"
                        style={{ border: "0" }}
                    >
                        <MoreHorizontal size={20} strokeWidth={1} />
                    </Button>
                </Dropdown>
            </div>
        </Header>
    );

    return (
        <Sider width={300}>
            <div
                style={{
                    display: "flex",
                    flex: "1",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    height: "100%",
                    borderRight: "1px solid rgba(0, 0, 0, 0.05)"
                }}
            >
                {userInfo}
                {messageHeader}
                {/* {messageFooter} */}
                {messagesSidebar}
            </div>
        </Sider>
    );
}

export default ChatSidebar;
