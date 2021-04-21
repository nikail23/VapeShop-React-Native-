import { createSelector } from "reselect"

const selectAuth = (state) => {
  return state.auth;
};

export const getAuthToken = createSelector(selectAuth, (auth) => {
  return auth.token;
});

export const getDidTryAutoLogin = createSelector(selectAuth, (auth) => {
  return auth.didTryAutoLogin;
});

export const getLoading = createSelector(selectAuth, (auth) => {
  return auth.loading;
});

export const getError = createSelector(selectAuth, (auth) => {
  return auth.error;
});
