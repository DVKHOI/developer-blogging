import { createSelector } from "@reduxjs/toolkit";

export const postListSelector = (state) => state.postsRedux.post;

export const postRemainingSelector = createSelector(
  postListSelector,
  (postList) => {
    return postList;
  }
);
