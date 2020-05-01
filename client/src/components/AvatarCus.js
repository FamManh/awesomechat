import React from "react";
import { Avatar } from "antd";

function AvatarCus(props) {
    const { record, size = 40 } = props;
    if (!record) return <Avatar size={size} icon="user" />;

    if (record.picture) {
        return (
            <Avatar
                {...props}
                shape="circle"
                size={size}
                src={
                    process.env.REACT_APP_STATIC_AVATARS + "/" + record.picture
                }
            />
        );
    }

    if (record.firstname && record.lastname) {
        return (
            <Avatar
                {...props}
                size={size}
                style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                }}
            >
                {record.firstname[0].toUpperCase() +
                    record.lastname[0].toUpperCase()}
            </Avatar>
        );
    }

    return <Avatar {...props} size={size} icon="team" />;
}

export default AvatarCus;
