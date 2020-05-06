import React from "react";
import {
    List,
    Button,
    Tooltip
} from "antd";
import Search from "antd/lib/input/Search";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import selectors from "../selectors";
import contactActions from "../../ContactPage/actions";
import AvatarCus from "../../../components/AvatarCus";
const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectors.selectUsers);
    const findLoading = useSelector(selectors.selectFindLoading);

    const handleSearch = term => {
        if(term.trim() === "") return
        dispatch(actions.list({ term }));
    };

    const searchbar = (
        <div className="py-3 px-3" style={{ backgroundColor: "#fff" }}>
            <Search
                placeholder="Search contact"
                onSearch={handleSearch}
                loading={findLoading}
            />
        </div>
    );

    const handleAddContactClick = userInfo => {
        dispatch(contactActions.doCreate(userInfo));
    };

    const handleRemoveContactClick = userInfo => {
        if (userInfo.type === "request") {
            dispatch(contactActions.doDestroyRequest(userInfo));
        } else if (userInfo.type === "requestSent") {
            dispatch(contactActions.doDestroyRequestSent(userInfo));
        } else if (userInfo.type === "contact") {
            dispatch(contactActions.doDestroyContact(userInfo));
        }
    };

    const handleConfirmContactClick = userInfo => {
        dispatch(contactActions.doUpdate(userInfo));
    };
    const renderFriendsList = () => {
        return (
            <List
                className="scroll-y flex-1 bg-transparent"
                itemLayout="horizontal"
                dataSource={users}
                renderItem={(item, index) => (
                    <List.Item
                        className={`"border-0" border-0 px-4 py-3`}
                    >
                        <List.Item.Meta
                            avatar={
                                // <Badge dot status="success"> </Badge>
                                
                                    <AvatarCus record={item} />
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
                                    {!!item.type && item.type === "notContact" && (
                                        <Tooltip title="Add Contact">
                                            <Button
                                                type="primary"
                                                size="small"
                                                onClick={() =>
                                                    handleAddContactClick(item)
                                                }
                                            >
                                                Add Contact
                                            </Button>
                                        </Tooltip>
                                    )}
                                    {!!item.type && item.type === "request" && (
                                        <>
                                            <Tooltip title="Confirm request">
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    onClick={() =>
                                                        handleConfirmContactClick(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Confirm
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Remove request">
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        handleRemoveContactClick(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </Tooltip>
                                        </>
                                    )}
                                    {!!item.type &&
                                        item.type === "requestSent" && (
                                            <Tooltip title="Cancel request">
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        handleRemoveContactClick(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Cancel Request
                                                </Button>
                                            </Tooltip>
                                        )}
                                    {!!item.type && item.type === "contact" && (
                                        <>
                                            <Tooltip title="Remove contact">
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        handleRemoveContactClick(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Remove Contact
                                                </Button>
                                            </Tooltip>
                                        </>
                                    )}
                                    {!!item.type && item.type === "you" && (
                                        <span>You</span>
                                    )}
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        );
    };
    return (
        <>
            {searchbar}
            {renderFriendsList()}
        </>
    );
};
export default UserList;
