import { configureStore } from '@reduxjs/toolkit'
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
