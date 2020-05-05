import getSocket from "../rootSocket";
import message from '../shared/message';
import playBell from "../shared/sound/bell";

export const emitAddNewContact = payload => {
    getSocket().emit("add-new-contact", payload);
};

export const onAddContact = payload => {
    playBell("notification");
    message.info(payload);
};

export const emitAcceptRequestContact = (payload) => {
    getSocket().emit("accept-request-contact", payload);
};

export const onAcceptRequestContact = (payload) => {
    playBell("notification")
    message.info(payload);
};
