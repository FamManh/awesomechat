import React, { useEffect, useState } from "react";
import {
    Layout,
    Collapse,
    Icon,
    Button,
    Spin,
    Menu,
    Dropdown,
    Popconfirm,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import userSelectors from "../UserPage/selectors";
import selectors from "./selectors";
import AvatarCus from "../../components/AvatarCus";
import actions from "./actions";
import ImageGrid from "./styles/ImageGrid";
import FileList from "./styles/FileList";
import Carousel, { Modal, ModalGateway } from "react-images";
import ListUser from "./styles/ListUser";
import { Link } from "react-router-dom";
import ModalAddMemberToGroup from "./ModalAddMemberToGroup";
import ModalUpdateChatGroup from "./ModalUpdateChatGroup";
import layoutSelectors from "../Layout/selectors";
import layoutActions from "../Layout/actions";
import { ArrowLeft } from "react-feather";

const { Sider, Header } = Layout;

const ButtonCus = ({ text, icon, onClick }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                justifyItems: "center",
                cursor: "pointer",
                height: "40px",
                lineHeight: "40px",
            }}
            onClick={onClick}
        >
            <span>{text}</span>
            <span>
                <Icon type={icon} />
            </span>
        </div>
    );
};

function RightSideBar() {
    const dispatch = useDispatch();
    const record = useSelector(selectors.selectRecord);
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const getImageListLoading = useSelector(
        selectors.selectGetImageListLoading
    );
    const getFileListLoading = useSelector(selectors.selectGetFileListLoading);
    const images = useSelector(selectors.selectImageList);
    const files = useSelector(selectors.selectFileList);
    const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);
    const rightSidebarVisible = useSelector(
        layoutSelectors.selectRightSidebarVisible
    );

    const [imageModalShow, setImageModalShow] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [modalAddmemberVisible, setModalAddmemberVisible] = useState(false);
    const [modalUpdateChatGroup, setModalUpdateChatGroup] = useState(false);

    const getMoreImage = () => {
        if (images) {
            dispatch(
                actions.listImage({
                    id: record.receiver.id,
                    skip: images.length,
                })
            );
        }
    };

    const getMoreFile = () => {
        if (files) {
            dispatch(
                actions.listFile({ id: record.receiver.id, skip: files.length })
            );
        }
    };
    const userInfo = (
        <Header
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.3rem 1.5rem",
                zIndex: "1",
                boxShadow:
                    "0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02)",
                height: "auto",
                lineHeight: "auto",
                backgroundColor: "#fff",
                marginTop: "30px",
            }}
        >
            <div>
                <AvatarCus
                    record={record ? record.receiver : null}
                    size={100}
                />
            </div>
            <div style={{ margin: "10px 0px", textAlign: "center" }}>
                <h2>
                    {record
                        ? record.conversationType === "ChatGroup"
                            ? `${record.receiver.name}`
                            : `${record.receiver.firstname} ${record.receiver.lastname}`
                        : null}
                </h2>
            </div>
        </Header>
    );

    const handleRemoveMember = (member) => {
        dispatch(
            actions.doRemoveMember({
                userId: member.id,
                groupId: record.receiver.id,
                currentUser: currentUser,
                member: member,
            })
        );
    };

    const menu = (member, members) => {
        return (
            <Menu>
                <Menu.Item key="0">
                    <Link to={`/m/${member.id}`}>Message</Link>
                </Menu.Item>
                {members.filter((item) => item.admin === true)[0].id ===
                    currentUser.id && (
                    <Menu.Item
                        key="1"
                        onClick={() => handleRemoveMember(member)}
                    >
                        Remove from group
                    </Menu.Item>
                )}
            </Menu>
        );
    };

    const renderPeople = (members) => {
        return members.map((member, key) => (
            <div className="list-item" key={key}>
                <div>
                    <AvatarCus className="avatar" record={member} />
                    {`${member.firstname} ${member.lastname}`}
                    {member.admin ? (
                        <span style={{ color: "#959595" }}> (admin)</span>
                    ) : (
                        ""
                    )}
                </div>
                <div style={{ lineHeight: "40px" }}>
                    {currentUser && currentUser.id === member.id ? (
                        ""
                    ) : (
                        <Dropdown
                            overlay={() => menu(member, members)}
                            trigger={["click"]}
                        >
                            <Button
                                style={{ border: "0px" }}
                                shape="circle"
                                icon="ellipsis"
                            ></Button>
                        </Dropdown>
                    )}
                </div>
            </div>
        ));
    };

    const renderImagesGrid = (source) => {
        if (!source || (source && source.length === 0)) {
            return null;
        }
        return source.map((image, key) => (
            <div
                key={key}
                style={{
                    backgroundImage: `url(${image.src})`,
                }}
                className="photo"
                onClick={() => {
                    setCurrentImageIndex(key);
                    setImageModalShow(true);
                }}
            ></div>
        ));
    };

    const renderFileList = (source) => {
        if (!source || (source && source.length === 0)) {
            return null;
        }
        return source.map((file, index) => (
            <div className="file" key={index}>
                <Icon type="file-text" />
                <a
                    target="_blank"
                    href={`${process.env.REACT_APP_STATIC_FILES}/${file.path}`}
                >
                    {file.name}
                </a>
            </div>
        ));
    };

    const leaveGroupChat = () => {
        dispatch(
            actions.doRemoveMember({
                userId: currentUser.id,
                groupId: record.receiver.id,
                currentUser: currentUser,
                receiver: record.receiver,
            })
        );
    };

    const renderContent = () => {
        return (
            <Collapse
                bordered={false}
                defaultActiveKey={["1", "4"]}
                expandIcon={({ isActive }) => (
                    <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
                expandIconPosition="right"
            >
                {record && record.receiver && record.receiver.members && (
                    <Collapse.Panel
                        header={
                            <span
                                style={{ color: "rgba(126, 126, 126, 0.85)" }}
                            >
                                OPTIONS
                            </span>
                        }
                        key="1"
                    >
                        <Popconfirm
                            style={{ maxWidth: "300px" }}
                            title="Are you sure to leave this conversation?"
                            onConfirm={leaveGroupChat}
                            okText="Leave"
                        >
                            <ButtonCus text="Leave Group Chat" icon="logout" />
                        </Popconfirm>
                    </Collapse.Panel>
                )}
                {record && record.receiver && record.receiver.members && (
                    <Collapse.Panel
                        header={
                            <span
                                style={{ color: "rgba(126, 126, 126, 0.85)" }}
                            >
                                PEOPLE
                            </span>
                        }
                        key="4"
                    >
                        <ListUser>
                            {renderPeople(record.receiver.members)}
                            <Button
                                block
                                onClick={() => setModalAddmemberVisible(true)}
                            >
                                Add people
                            </Button>
                        </ListUser>
                    </Collapse.Panel>
                )}
                {files && files.length && (
                    <Collapse.Panel
                        header={
                            <span
                                style={{ color: "rgba(126, 126, 126, 0.85)" }}
                            >
                                SHARED FILES
                            </span>
                        }
                        key="2"
                    >
                        <Spin spinning={getFileListLoading}>
                            <FileList>{renderFileList(files)}</FileList>
                        </Spin>

                        <Button type="link" block onClick={getMoreFile}>
                            More
                        </Button>
                    </Collapse.Panel>
                )}
                {images && images.length > 0 && (
                    <Collapse.Panel
                        header={
                            <span
                                style={{ color: "rgba(126, 126, 126, 0.85)" }}
                            >
                                SHARED PHOTOS
                            </span>
                        }
                        key="3"
                    >
                        <Spin spinning={getImageListLoading}>
                            <ImageGrid>{renderImagesGrid(images)}</ImageGrid>
                        </Spin>
                        <Button type="link" block onClick={getMoreImage}>
                            More
                        </Button>
                    </Collapse.Panel>
                )}
            </Collapse>
        );
    };

    useEffect(() => {
        dispatch(actions.listImage({ id: record.receiver.id }));
        dispatch(actions.listFile({ id: record.receiver.id }));
    }, []);

    return (
        <Sider
            width={isMobileDevice ? "100vw" : "300px"}
            style={{ overflowY: "auto" }}
        >
            <ModalGateway>
                {imageModalShow ? (
                    <Modal onClose={() => setImageModalShow(false)}>
                        <Carousel
                            currentIndex={currentImageIndex}
                            components={{ FooterCaption: () => null }}
                            views={images}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
            {modalAddmemberVisible && (
                <ModalAddMemberToGroup
                    visible={modalAddmemberVisible}
                    doToggle={() =>
                        setModalAddmemberVisible(!modalAddmemberVisible)
                    }
                />
            )}
            {modalUpdateChatGroup && (
                <ModalUpdateChatGroup
                    visible={modalUpdateChatGroup}
                    doToggle={() =>
                        setModalUpdateChatGroup(!modalUpdateChatGroup)
                    }
                    info={record.receiver}
                />
            )}
            <div
                style={{
                    display: "flex",
                    flex: "1",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    height: "100%",
                    borderLeft: "1px solid rgba(0, 0, 0, 0.05)",
                }}
            >
                <div style={{ margin: "5px 5px 0 0" }}>
                    {isMobileDevice && rightSidebarVisible && (
                        <Button
                            style={{
                                float: "left",
                                border: "0px",
                                margin: "10px 0px 0px 15px",
                            }}
                            shape="circle"
                            onClick={() =>
                                dispatch(layoutActions.doHideRightSidebar())
                            }
                        >
                            <ArrowLeft size={20} strokeWidth={2} />
                        </Button>
                    )}
                    {record && record.conversationType === "ChatGroup" && (
                        <Button
                            style={{
                                float: "right",
                                border: "0px",
                                margin: "10px 15px 0px 0px",
                            }}
                            shape="circle"
                            icon="edit"
                            onClick={() => setModalUpdateChatGroup(true)}
                        ></Button>
                    )}
                </div>

                {userInfo}
                {renderContent()}
            </div>
        </Sider>
    );
}

export default RightSideBar;
