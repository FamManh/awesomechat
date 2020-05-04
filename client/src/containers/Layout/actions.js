import constants from "./constants";
import { getHistory } from "../configureStore";

const actions = {
    doWindowResize: (windowWidth) => ({
        type: constants.LAYOUT_WINDOW_RESIZE,
        payload: windowWidth,
    }),
    doToggleRightSidebar: () => {
        return {
            type: constants.LAYOUT_RIGHT_SIDEBAR_TOGGLE,
        };
    },
    doHideRightSidebar: () => {
        return {
            type: constants.LAYOUT_RIGHT_SIDEBAR_HIDE,
        };
    },
    doShowRightSidebar: () => {
        return {
            type: constants.LAYOUT_RIGHT_SIDEBAR_SHOW,
        };
    },
    doHideLeftSidebar: () => {
        return {
            type: constants.LAYOUT_LEFT_SIDEBAR_HIDE,
        };
    },
    doShowLeftSidebar: () => {
        return {
            type: constants.LAYOUT_LEFT_SIDEBAR_SHOW,
        };
    },
};
export default actions;
