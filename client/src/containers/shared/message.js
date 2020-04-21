import React from 'react';
import { notification, message } from 'antd';
import AvatarCus from '../../components/AvatarCus';

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
    message.open({
        content: arg.message,
        icon: (
            <span style={{marginRight: "5px"}}>
                {" "}
                <AvatarCus record={arg} />
            </span>
        ),
    });}
}
