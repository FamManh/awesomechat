import React from "react";
import { Icon, Row } from "antd";

function ImageUploadList({ fileList, onDelete }) {
    return (
        <div
            className="clearfix"
            style={{
                maxHeight: "130px",
                overflowY: "auto",
            }}
        >
            <span className="ant-upload-picture-card-wrapper">
                {fileList.map((file, index) => {
                    return (
                        <div
                            key={index}
                            className="ant-upload-list ant-upload-list-picture-card"
                        >
                            <div className="ant-upload-list-picture-card-container">
                                <span>
                                    <div
                                        className={`ant-upload-list-item ${file.status === "error"? "ant-upload-list-item-error" : ""} ant-upload-list-item-list-type-picture-card`}
                                    >
                                        {file.status === "uploading" ? (
                                            <Row
                                                type="flex"
                                                align="middle"
                                                justify="center"
                                                style={{
                                                    height: "100%",
                                                }}
                                            >
                                                <Icon type="loading" />
                                            </Row>
                                        ) : (
                                            <>
                                                <div className="ant-upload-list-item-info">
                                                    <span className="ant-upload-list-item-actions"></span>
                                                    <img
                                                        className="ant-upload-list-item-thumbnail"
                                                        src={ file.response ?
                                                            file.response
                                                                .thumbUrl : ''
                                                        }
                                                        alt="image upload"
                                                    />
                                                </div>
                                                <span className="ant-upload-list-item-actions">
                                                    <Icon
                                                        onClick={() =>
                                                            onDelete(
                                                                fileList.filter(
                                                                    (item) =>
                                                                        item.uid !==
                                                                        file.uid
                                                                )
                                                            )
                                                        }
                                                        className="anticon"
                                                        type="delete"
                                                    />
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </span>
        </div>
    );
}

export default ImageUploadList;
