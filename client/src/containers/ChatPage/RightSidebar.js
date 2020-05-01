import React, { useEffect, useState } from "react";
import {
    Layout,
    Row,
    Collapse,
    Icon,
    Button,
    Spin,
    Menu,
    Dropdown,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import userSelectors from "../UserPage/selectors";
import selectors from "./selectors";
import AvatarCus from "../../components/AvatarCus";
import actions from "./actions";
import ImageGrid from "./styles/ImageGrid";
import FileList from './styles/FileList'
import Carousel, { Modal, ModalGateway } from "react-images";
import ListUser from "./styles/ListUser";
import {Link} from 'react-router-dom'
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
    const getFileListLoading = useSelector(selectors.selectGetFileListLoading)
    const images = useSelector(selectors.selectImageList);
    const files = useSelector(selectors.selectFileList);

    const [imageModalShow, setImageModalShow] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0)


    const getMoreImage = () => {
        if(images){
            dispatch(
                actions.listImage({
                    id: record.receiver.id,
                    skip: images.length,
                })
            );
        }
    }

    const getMoreFile = () => {
        if(files){
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
            <Row>
                <div>
                    <AvatarCus
                        record={record ? record.receiver : null}
                        size={100}
                    />
                </div>
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {record
                        ? record.conversationType === "ChatGroup"
                            ? `${record.receiver.name}`
                            : `${record.receiver.firstname} ${record.receiver.lastname}`
                        : null}
                </div>
            </Row>
        </Header>
    );

    const menu = (member, members) => {
        return (
            <Menu>
                <Menu.Item key="0">
                    <Link to={`/m/${member.id}`}>Message</Link>
                </Menu.Item>
                {members.filter((item) => item.admin === true)[0].id ===
                    currentUser.id && (
                    <Menu.Item key="1">
                        <a href="http://www.alipay.com/">Remove from group</a>
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
                </div>
                <div style={{ lineHeight: "40px" }}>
                    {member.admin ? (
                        <span style={{ color: "#6e6e6e" }}>admin</span>
                    ) : (
                        ""
                    )}
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
    }

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
    }

    const renderContent = () => {
        return (
            <Collapse
                bordered={false}
                defaultActiveKey={["1", "2", "3"]}
                expandIcon={({ isActive }) => (
                    <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
                expandIconPosition="right"
            >
                <Collapse.Panel
                    header={
                        <span style={{ color: "rgba(126, 126, 126, 0.85)" }}>
                            OPTIONS
                        </span>
                    }
                    key="1"
                >
                    <ButtonCus
                        text="Blocks Message"
                        icon="stop"
                        onClick={() => alert("Clicked")}
                    />
                </Collapse.Panel>
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
                            <Button block>Add people</Button>
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
        <Sider width={350} style={{ overflowY: "auto" }}>
            <ModalGateway>
                {imageModalShow ? (
                    <Modal onClose={() => setImageModalShow(false)}>
                        <Carousel
                            currentIndex={currentImageIndex}
                            components={{ FooterCaption: ()=> null }}
                            views={images}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
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
                {userInfo}
                {renderContent()}
            </div>
        </Sider>
    );
}

export default RightSideBar;
