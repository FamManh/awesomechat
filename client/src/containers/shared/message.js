import React from 'react';
import { notification, Avatar } from 'antd';

export default class Message {
  static success(arg) {
    notification.success({
      message: arg,
      description: '',
    });
  }

  static error(arg) {
    notification.error({
      message: arg,
      description: '',
    });
  }

  static info(arg){
    notification.open({
        message: arg.message,
        description: "",
        icon: arg.picture ? (
            <Avatar
                src={
                    process.env
                        .REACT_APP_STATIC_URI + "/" + arg.picture
                }
            />
            ) : (
                <Avatar
                    size={48}
                    style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf"
                    }}
                >
                    {arg.firstname[0].toUpperCase() +
                        arg.lastname[0].toUpperCase()}
                </Avatar>
            )
    });
  }
}
