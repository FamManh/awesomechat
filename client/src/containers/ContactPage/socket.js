import getSocket from "../rootSocket";
import message from '../shared/message';

export const emitAddNewContact = payload => {
    getSocket().emit("add-new-contact", payload);
};

export const onAddContact = payload => {
    console.log(payload)
    message.info(payload);
};
