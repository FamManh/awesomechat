import { createSelector } from "reselect";

const selectRaw = (state) => state.message;

const selectFindLoading = createSelector(
    [selectRaw],
    (message) => message.findLoading
);

const selectCurrentSound = createSelector(
    [selectRaw],
    (message) => message.currentSound
);

const selectSoundPlayStatus = createSelector(
    [selectRaw],
    (message) => message.soundPlayStatus
);

const selectSending = createSelector([selectRaw], (message) => message.sending);

const selectGetImageListLoading = createSelector(
    [selectRaw],
    (message) => message.getImageListLoading
);

const selectGetFileListLoading = createSelector(
    [selectRaw],
    (message) => message.getFileListLoading
);

const selectMessageListLoading = createSelector(
    [selectRaw],
    (message) => message.messageListLoading
);

const selectHasMoreMessageList = createSelector(
    [selectRaw],
    (message) => message.hasMoreMessageList
);

const selectRecord = createSelector([selectRaw], (message) => message.record);

const selectMessages = createSelector(
    [selectRaw],
    (message) => message.messages
);

const selectInputMessage = createSelector(
    [selectRaw],
    (message) => message.inputMesage
);

const selectRightSidebarVisible = createSelector(
    [selectRaw],
    (message) => message.rightSidebarVisible
);

const selectTyping = createSelector([selectRaw], (message) => message.typing);

const selectImageList = createSelector(
    [selectRaw],
    (message) => message.imageList
);

const selectFileList = createSelector(
    [selectRaw],
    (message) => message.fileList
);

const selectHasMoreConversation = createSelector(
    [selectRaw],
    (message) => message.hasMoreConversation
);

const selectScrollToBottom = createSelector(
    [selectRaw],
    (message) => message.scrollToBottom
);

const selectors = {
    selectFindLoading,
    selectMessageListLoading,
    selectRecord,
    selectMessages,
    selectInputMessage,
    selectRightSidebarVisible,
    selectTyping,
    selectImageList,
    selectFileList,
    selectGetImageListLoading,
    selectGetFileListLoading,
    selectHasMoreConversation,
    selectScrollToBottom,
    selectHasMoreMessageList,
    selectSending,
    selectSoundPlayStatus,
    selectCurrentSound
};

export default selectors;
