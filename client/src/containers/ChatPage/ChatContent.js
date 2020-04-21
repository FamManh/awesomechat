import React, { useRef, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import "./picturewallStyle.css";
import {
    Layout
} from "antd";
import ChatStyled from "./styles/chat";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import ImageUploadList from "./ImageUploadList";
import constants from "./constants";
import FileUploadList from "./FileUploadList";
import Conversation from "./Conversation";
import ChatContentFooter from "./ChatContentFooter";
import ChatContentHeader from "./ChatContentHeader";
import Spinner from '../shared/Spinner'


function ChatContent() {
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const record = useSelector(selectors.selectRecord);
    const inputMessage = useSelector(selectors.selectInputMessage);
    const findLoading = useSelector(selectors.selectFindLoading)
    

    const scrollToBottom = () => {
        if (scrollRef.current)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };
    useEffect(() => {
        scrollToBottom();
    }, [record]);

    const onInputImageListChange = ({ fileList }) => {
        dispatch({
            type: constants.INPUT_IMAGE_LIST_CHANGE,
            payload: [...fileList],
        });
    };

    const onInputFileListChange = ({ fileList }) => {
        dispatch({
            type: constants.INPUT_FILE_LIST_CHANGE,
            payload: [...fileList],
        });
    };

    if(findLoading){
        
        return <Spinner/>
    }

    return (
            <Layout style={{ position: "relative" }}>
                <ChatContentHeader />
                <ChatStyled ref={scrollRef}>
                    {record && <Conversation messages={record.messages} />}
                </ChatStyled>
                <div className="px-3 py-2" style={{ background: "#f9f9f9" }}>
                    {inputMessage && inputMessage.images.length > 0 && (
                        <ImageUploadList
                            fileList={inputMessage.images}
                            onDelete={(fileList) =>
                                onInputImageListChange({ fileList })
                            }
                        />
                    )}
                    {inputMessage && inputMessage.files.length > 0 && (
                        <FileUploadList
                            onDelete={(fileList) =>
                                onInputFileListChange({ fileList })
                            }
                            fileList={inputMessage.files}
                        />
                    )}
                    <ChatContentFooter />
                </div>
            </Layout>
    );
}

export default ChatContent;
