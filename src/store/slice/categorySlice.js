import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categoryRedux",
  initialState: { loading: false, categories: [] },
  reducers: {
    fetchCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { fetchCategories } = categorySlice.actions;
export default categorySlice.reducer;
