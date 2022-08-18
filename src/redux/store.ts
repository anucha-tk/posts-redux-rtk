import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/counterSlice";
import { postApi } from "./posts/postApi";

const rootReducers = {
  [postApi.reducerPath]: postApi.reducer,
  counter: counterReducer,
};

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
