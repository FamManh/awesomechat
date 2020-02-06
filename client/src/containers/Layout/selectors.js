import { createSelector } from "reselect";

const selectRaw = state => state.layout;

const selectMenuVisible = createSelector(
    [selectRaw],
    layout => layout.menuVisible
);

const selectors = {
    selectMenuVisible
};

export default selectors;
