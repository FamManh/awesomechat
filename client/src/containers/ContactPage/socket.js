import getSocket from "../rootSocket";
import message from '../shared/message';
import playBell from "../shared/sound/bell";
import {CONTACT_REQUEST_ADD} from './constants'
import getStore from "../configureStore";
export const emitAddNewContact = payload => {
    getSocket().emit("add-new-contact", payload);
};

export const onAddContact = payload => {
    playBell("notification");
    message.info(payload);
    getStore().dispatch({ type: CONTACT_REQUEST_ADD, payload });
};

export const emitAcceptRequestContact = (payload) => {
    getSocket().emit("accept-request-contact", payload);
};

export const onAcceptRequestContact = (payload) => {
    playBell("notification")
    message.info(payload);
};
