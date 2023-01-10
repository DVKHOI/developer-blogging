import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "postsRedux",
  initialState: { loading: false, posts: [] },
  reducers: {
    fetchPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { fetchPosts } = postSlice.actions;
export default postSlice.reducer;
