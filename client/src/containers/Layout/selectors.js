import { createSelector } from "reselect";

const selectRaw = state => state.layout;

const selectWindowWidth = createSelector(
    [selectRaw],
    (layout) => layout.windowWidth
);

const selectLeftSidebarVisible = createSelector(
    [selectRaw],
    (layout) => layout.leftSidebarVisible
);

const selectRightSidebarVisible = createSelector(
    [selectRaw],
    (layout) => layout.rightSidebarVisible
);

const selectIsMobileDevice = createSelector(
    [selectRaw],
    (layout) => layout.isMobileDevice,
);

const selectors = {
    selectLeftSidebarVisible,
    selectRightSidebarVisible,
    selectIsMobileDevice,
    selectWindowWidth,
};

export default selectors;
