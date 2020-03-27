import {createSelector} from 'reselect'

const selectRaw = state=>state.message;

const selectRecord = createSelector([selectRaw], message=>message.record);

const selectMessages = createSelector([selectRaw], message=> message.messages)

const selectors = {
    selectRecord,
    selectMessages
};

export default selectors;
