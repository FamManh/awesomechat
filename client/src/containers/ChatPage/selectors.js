import {createSelector} from 'reselect'

const selectRaw = state=>state.message;

const selectFindLoading = createSelector(
    [selectRaw],
    (message) => message.findLoading
);

const selectRecord = createSelector([selectRaw], message=>message.record);

const selectMessages = createSelector([selectRaw], message=> message.messages)

const selectInputMessage = createSelector(
    [selectRaw],
    message => message.inputMesage
);

const selectRightSidebarVisible = createSelector(
    [selectRaw],
    (message) => message.rightSidebarVisible
);

const selectTyping = createSelector(
    [selectRaw],
    message => message.typing
)

const selectors = {
    selectFindLoading,
    selectRecord,
    selectMessages,
    selectInputMessage,
    selectRightSidebarVisible,
    selectTyping,
};

export default selectors;
