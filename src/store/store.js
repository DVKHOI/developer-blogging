import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/categorySlice";
import postSlice from "./slice/postSlice";
import userSlice from "./slice/userSlice";

const store = configureStore({
  reducer: {
    postsRedux: postSlice,
    categoryRedux: categorySlice,
    usersRedux: userSlice,
  },
});
export default store;
