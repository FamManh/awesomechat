import constants from "./constants";
import produce from 'immer';
const initialState = {
    leftSidebarVisible: true,
    rightSidebarVisible: false,
    windowWidth: 0,
    isMobileDevice: true,
    settings:{
        sound: true
    }
};

const layoutReducer = (state = initialState, {type, payload})=>
    produce(state, draft=> {
    switch (type) {
        case constants.LAYOUT_WINDOW_RESIZE:
            if (payload < 648) {
                draft.isMobileDevice = true;
            } else {
                draft.isMobileDevice = false;
            }
            draft.windowWidth = payload;
            break;
        case constants.LAYOUT_LEFT_SIDEBAR_HIDE:
            draft.leftSidebarVisible = false;
            break;
        case constants.LAYOUT_LEFT_SIDEBAR_SHOW:
            draft.leftSidebarVisible = true;
            draft.rightSidebarVisible = false;
            break;
        case constants.LAYOUT_RIGHT_SIDEBAR_TOGGLE:
            draft.rightSidebarVisible = !state.rightSidebarVisible;
            break;
        case constants.LAYOUT_RIGHT_SIDEBAR_HIDE:
            draft.rightSidebarVisible = false;
            break;
        case constants.LAYOUT_RIGHT_SIDEBAR_SHOW:
            draft.rightSidebarVisible = true;
            break;
        case constants.LAYOUT_SOUND_TOGGLE:
            draft.settings.sound = !state.settings.sound
            break;
        default:
            break;
    }
});

export default layoutReducer;
