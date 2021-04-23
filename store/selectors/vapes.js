import { createSelector } from "reselect";

const getVape = (state) => state.vape;

export const getAvailableVape = createSelector(
  getVape,
  (vape) => vape.availableVape
);

export const getFilteredVape = createSelector(
  getVape,
  (vape) => vape.filteredVape
);

export const getVapeFilters = createSelector(
  getVape,
  (vape) => vape.filters
);

export const getSettings = createSelector(
  getVape,
  (vape) => vape.settings
);

export const getUserVape = createSelector(
  getVape,
  (vape) => vape.userVape
);

export const getVapeById = (vapeId) =>
  createSelector(getVape, (vape) => {
    return vape.availableVape.find((vapeEl) => vapeEl.id === vapeId);
  });

export const getLoading = createSelector(getVape, (vape) => {
  return vape.loading;
});
