import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "usersRedux",
  initialState: { loading: false, users: [] },
  reducers: {
    fetchUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { fetchUsers } = userSlice.actions;
export default userSlice.reducer;
