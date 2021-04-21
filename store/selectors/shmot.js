import { createSelector } from "reselect";

const getShmot = (state) => state.shmot;

export const getAvailableShmot = createSelector(
  getShmot,
  (shmot) => shmot.availableShmot
);

export const getFilteredShmot = createSelector(
  getShmot,
  (shmot) => shmot.filteredShmot
);

export const getShmotFilters = createSelector(
  getShmot,
  (shmot) => shmot.filters
);

export const getSettings = createSelector(
  getShmot,
  (shmot) => shmot.settings
);

export const getUserShmot = createSelector(
  getShmot,
  (shmot) => shmot.userShmot
);

export const getShmotById = (shmotId) =>
  createSelector(getShmot, (shmot) => {
    return shmot.availableShmot.find((shmotEl) => shmotEl.id === shmotId);
  });

export const getLoading = createSelector(getShmot, (shmot) => {
  return shmot.loading;
});
