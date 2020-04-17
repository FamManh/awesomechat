import React from "react";
import { Avatar } from "antd";

function AvatarCus({ record, size = 40 }) {
    if (!record) return <Avatar size={size} icon="user" />;

    if (record.picture) {
        return (
            <Avatar
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

    return <Avatar size={size} icon="team" />;
}

export default AvatarCus;
