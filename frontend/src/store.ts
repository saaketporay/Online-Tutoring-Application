import { configureStore } from '@reduxjs/toolkit'
import modalReducer from "./features/modalSlice";
import tokenReducer from "./features/tokenSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    token: tokenReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
