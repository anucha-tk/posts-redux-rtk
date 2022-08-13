import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/counterSlice";
import { postReducer } from "./posts/postSlice";
const rootReducers = combineReducers({
  counter: counterReducer,
  posts: postReducer,
});
export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
