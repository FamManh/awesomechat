import {  Form, Icon, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../shared/routes/permissionChecker";
const UpdateAvatar = ({
    picture,
    action = `${process.env.REACT_APP_API_URI}/user/avatar`,
    onSuccess
}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(picture ? picture : "");
    useEffect(() => {
        setImageUrl(picture);
        return () => {};
    }, [picture]);
    let getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    let beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };
    let handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            if (info.file.response.message === "success") {
                onSuccess(info.file.response.picture);
            }
            getBase64(info.file.originFileObj, (imageUrl) => {
                setImageUrl(imageUrl);
                setLoading(false);
            });
        }
    };

    const uploadButton = (
        <div>
            <Icon type={loading ? "loading" : "plus"} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={action}
            headers={{
                Authorization: "Bearer " + isAuthenticated(),
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

export default Form.create()(UpdateAvatar);
