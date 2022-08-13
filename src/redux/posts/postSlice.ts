import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";

export type ReactionsOptions = {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
};

export type PostState = {
  id: string;
  title: string;
  content: string;
  date: string;
  reactions: ReactionsOptions;
};

const initialState: PostState[] = [
  {
    id: nanoid(),
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 1,
      wow: 0,
      heart: 0,
      rocket: 3,
      coffee: 0,
    },
  },
  {
    id: nanoid(),
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 2,
      heart: 0,
      rocket: 0,
      coffee: 1,
    },
  },
];
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, { payload }: PayloadAction<PostState>) => {
        state.push(payload);
      },
      prepare: (payload) => ({
        payload: {
          id: nanoid(),
          date: sub(new Date(), { minutes: 5 }).toISOString(),
          ...payload,
        },
      }),
    },
    addReaction: (
      state,
      { payload }: PayloadAction<{ id: string; name: keyof ReactionsOptions }>
    ) => {
      const post = state.find((post) => post.id === payload.id);
      post && post.reactions[payload.name]++;
    },
  },
});

export const { postAdded, addReaction } = postSlice.actions;

export const postReducer = postSlice.reducer;
