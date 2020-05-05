import React from "react";
import { Icon } from "antd";

function FileUploadList({ fileList, onDelete }) {
    return (
        <div
            className="clearfix"
            style={{
                maxHeight: "130px",
                overflowY: "auto",
            }}
        >
            <span className="ant-upload-list ant-upload-list-text">
                {fileList.map((file, index) => {
                    return (
                        <div
                            key={index}
                            className={`ant-upload-list-item ${file.status === "error" ? "ant-upload-list-item-error" : "ant-upload-list-item-done"} ant-upload-list-item-list-type-text`}
                        >
                            <span>
                                <div className="ant-upload-list-item-info">
                                    <span>
                                        {file.status === "uploading" ? (
                                            <Icon type="loading" />
                                        ) : (
                                            <Icon type="paper-clip" />
                                        )}

                                        <span className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-1">
                                            {file.name}
                                        </span>
                                        <span className="ant-upload-list-item-card-actions">
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
                                                className="anticon anticon-delete"
                                                type="delete"
                                            />
                                        </span>
                                    </span>
                                </div>
                            </span>
                        </div>
                    );
                })}
            </span>
        </div>
    );
}

export default FileUploadList;
