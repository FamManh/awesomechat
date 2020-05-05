import getSocket from "../rootSocket";
import message from '../shared/message';

export const emitAddNewContact = payload => {
    getSocket().emit("add-new-contact", payload);
};

export const onAddContact = payload => {
    message.info(payload);
};

export const emitAcceptRequestContact = (payload) => {
    getSocket().emit("accept-request-contact", payload);
};

export const onAcceptRequestContact = (payload) => {
    console.log(payload)
    message.info(payload);
};
