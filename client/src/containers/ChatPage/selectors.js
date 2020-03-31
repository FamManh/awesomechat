import {createSelector} from 'reselect'

const selectRaw = state=>state.message;

const selectRecord = createSelector([selectRaw], message=>message.record);

const selectMessages = createSelector([selectRaw], message=> message.messages)

const selectInputMessage = createSelector(
    [selectRaw],
    message => message.inputMesage
);

const selectors = {
    selectRecord,
    selectMessages,
    selectInputMessage
};

export default selectors;
