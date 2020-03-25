import getSocket from "../rootSocket";
import message from '../shared/message';

export const emitAddNewContact = payload => {
    getSocket().emit("add-new-contact", payload);
};

export const onAddContact = payload => {
    message.info(payload);
};
