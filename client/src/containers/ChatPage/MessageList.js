import React from "react";
import {
    Icon,List, Spin
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import actions from './actions'
import { Link, useParams } from "react-router-dom";
import userSelectors from "../UserPage/selectors";
import AvatarCus from "../../components/AvatarCus";
import InfiniteScroll from "react-infinite-scroller";
import { formatDistanceToNowStrict } from "date-fns";
import { textAbstract } from "../shared/helper";


const MessageList = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const messages = useSelector(selectors.selectMessages);
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const messageListLoading = useSelector(selectors.selectMessageListLoading)
    const hasMoreMessageList = useSelector(
        selectors.selectHasMoreMessageList
    );

    const loadMoreMessageList = () => {
        let gskip = 0
        let pskip = 0
        messages.forEach(message=>{
            if (message.conversationType === "User") pskip += 1;
            if (message.conversationType === "ChatGroup") gskip += 1;
        })
        dispatch(actions.list({ gskip, pskip }));
    }
    if (messages && messages.length > 0) {
        return (
            <div className="scroll-y flex-1 bg-transparent">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={loadMoreMessageList}
                    hasMore={!messageListLoading && hasMoreMessageList}
                    useWindow={false}
                >
                    <List
                        style={{ marginTop: "5px" }}
                        itemLayout="horizontal"
                        dataSource={messages}
                        renderItem={(item, index) => {
                            if (!currentUser) return <span></span>;
                            let user = "";
                            if (item.conversationType === "ChatGroup") {
                                user = item.receiver;
                            } else {
                                user =
                                    item.sender._id === currentUser.id
                                        ? item.receiver
                                        : item.sender;
                            }
                            return (
                                <Link to={`/m/${user._id}`}>
                                    <List.Item
                                        style={{
                                            backgroundColor:
                                                user._id === userId
                                                    ? "#e6f7ff"
                                                    : "#fff",
                                            cursor: "pointer",
                                            borderRadius: "0.8rem",
                                        }}
                                        className={`${
                                            user._id === userId
                                                ? ""
                                                : "border-0"
                                        } border-0 px-4 py-3`}
                                    >
                                        <List.Item.Meta
                                            avatar={<AvatarCus record={user} />}
                                            title={
                                                <p
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "14px",
                                                            flex: 1,
                                                            whiteSpace:
                                                                "nowrap",
                                                            overflow: "hidden",

                                                            textOverflow:
                                                                "ellipsis",
                                                        }}
                                                    >
                                                        {item.conversationType ===
                                                        "ChatGroup"
                                                            ? textAbstract(
                                                                  item.receiver
                                                                      .name,
                                                                  20
                                                              )
                                                            : textAbstract(
                                                                  user.firstname +
                                                                      " " +
                                                                      user.lastname, 20
                                                              )}
                                                    </span>
                                                    <small>
                                                        {item.updatedAt
                                                            ? formatDistanceToNowStrict(
                                                                  new Date(
                                                                      item.updatedAt
                                                                  ),
                                                                  {
                                                                      addSuffix: false,
                                                                  }
                                                              )
                                                            : ""}
                                                    </small>
                                                </p>
                                            }
                                            description={
                                                <p
                                                    style={{
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        width: "200px",
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                >
                                                    {item.type === "text" ||
                                                    item.type ===
                                                        "notification" ? (
                                                        item.message ? (
                                                            item.message
                                                        ) : (
                                                            ""
                                                        )
                                                    ) : item.type ===
                                                      "image" ? (
                                                        <>
                                                            <Icon type="file-image" />
                                                            Photo(s)
                                                        </>
                                                    ) : item.type === "file" ? (
                                                        <>
                                                            <Icon type="paper-clip" />
                                                            File(s)
                                                        </>
                                                    ) : null}
                                                </p>
                                            }
                                        />
                                    </List.Item>
                                </Link>
                            );
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <Spin
                                spinning={messageListLoading && hasMoreMessageList}
                            ></Spin>
                        </div>
                    </List>
                </InfiniteScroll>
            </div>
        );
    }else{
        return <div></div>;
    }
};
export default MessageList;
