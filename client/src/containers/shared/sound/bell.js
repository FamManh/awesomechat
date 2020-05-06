import UIfx from "uifx";
import new_message from "./stairs.mp3";
// import new_message from "./new-message.mp3";
import new_message1 from "./new-message1.mp3";
import notification from "./definite.mp3";
import sent from "./all-eyes-on-me.mp3";
import typing from "./guess-what.mp3";
import { getSetting } from "../settings";

const bellNewMessage = new UIfx(new_message, {
    volume: 0.4, // number between 0.0 ~ 1.0
    throttleMs: 100,
});

const bellNewMessage1 = new UIfx(new_message1, {
    volume: 0.4, // number between 0.0 ~ 1.0
    throttleMs: 100,
});

const bellNotification = new UIfx(notification, {
    volume: 0.4, // number between 0.0 ~ 1.0
    throttleMs: 100,
});

const bellSent = new UIfx(sent, {
    volume: 0.1, // number between 0.0 ~ 1.0
    throttleMs: 100,
});

const bellTyping = new UIfx(typing, {
    volume: 0.1, // number between 0.0 ~ 1.0
    throttleMs: 100,
});

const playBell = (type = "") => {
    if (getSetting() && !getSetting().sound) return;
    switch (type) {
        case "new-message":
            bellNewMessage.play();
            break;
        case "new-message1":
            bellNewMessage1.play();
            break;
        case "notification":
            bellNotification.play();
            break;
        case "sent":
            bellSent.play();
            break;
        case "typing":
            bellTyping.play();
            break;
        default:
            bellNewMessage.play();
            break;
    }
};

export default playBell;
