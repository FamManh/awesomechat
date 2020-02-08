import { createSelector } from "reselect";

const selectRaw = state => state.contact;

const selectInitLoading = createSelector(
    [selectRaw],
    contact => contact.initLoading
);

const selectDataLoading = createSelector(
    [selectRaw],
    contact => contact.dataLoading
);

const selectSaveLoading = createSelector(
    [selectRaw],
    contact => contact.saveLoading
);

const selectDestroyLoading = createSelector(
    [selectRaw],
    contact => contact.destroyLoading
);

const selectFindLoading = createSelector(
    [selectRaw],
    contact => contact.findLoading
);

const selectExportLoading = createSelector(
    [selectRaw],
    contact => contact.exportLoading
);

const selectErrorMessage = createSelector([selectRaw], contact => contact.error);

const selectContacts = createSelector([selectRaw], contact => contact.contacts);

const selectRecord = createSelector([selectRaw], contact => contact.record)

const selectSelectedRowKeys = createSelector(
    [selectRaw],
    contact => contact.selectedRowKeys
);

const selectSelectedRows = createSelector(
    [selectRaw],
    contact => contact.selectedRows
);



const selectors = {
    selectDataLoading,
    selectInitLoading,
    selectSaveLoading,
    selectErrorMessage,
    selectContacts,
    selectSelectedRows,
    selectSelectedRowKeys,
    selectDestroyLoading,
    selectRecord,
    selectFindLoading,
    selectExportLoading
};

export default selectors;
