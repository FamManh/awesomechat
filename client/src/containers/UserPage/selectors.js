import { createSelector } from "reselect";

const selectRaw = state => state.user;

const selectInitLoading = createSelector(
    [selectRaw],
    user => user.initLoading
);

const selectDataLoading = createSelector(
    [selectRaw],
    user => user.dataLoading
);

const selectSaveLoading = createSelector(
    [selectRaw],
    user => user.saveLoading
);

const selectDestroyLoading = createSelector(
    [selectRaw],
    user => user.destroyLoading
);

const selectFindLoading = createSelector(
    [selectRaw],
    user => user.findLoading
);

const selectErrorMessage = createSelector([selectRaw], user => user.error);

const selectUsers = createSelector([selectRaw], user => user.users);

const selectRecord = createSelector([selectRaw], user => user.record)

const selectCurrentUser = createSelector([selectRaw], user=>user.current)

const selectors = {
    selectDataLoading,
    selectInitLoading,
    selectSaveLoading,
    selectErrorMessage,
    selectUsers,
    selectDestroyLoading,
    selectRecord,
    selectFindLoading,
    selectCurrentUser
};

export default selectors;
