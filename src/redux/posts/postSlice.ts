import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { fetchPosts } from "./postActions";

export interface ReactionsOptions extends KeyStringObj {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

interface KeyStringObj {
  [key: string]: any;
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  date: string;
  reactions: ReactionsOptions;
};

export interface PostState extends KeyStringObj {
  posts: Post[];
  status: "idle" | "loading" | "success" | "error";
  error: null;
}

const reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };

const initialState: PostState = { posts: [], status: "idle", error: null };
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, { payload }: PayloadAction<Post>) => {
        state.posts.push(payload);
      },
      prepare: (payload) => ({
        payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          reactions,
          ...payload,
        },
      }),
    },
    addReaction: (
      state,
      { payload }: PayloadAction<{ id: number; name: keyof ReactionsOptions }>
    ) => {
      const post = state.posts.find((post) => post.id === payload.id);
      post && post.reactions[payload.name]++;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.status = "success";
      let min = 1;
      const posts: Post[] = payload
        .map((post) => ({
          date: sub(new Date(), { minutes: min++ }).toISOString(),
          reactions,
          ...post,
        }))
        .sort((a, b) => +b.id - +a.id);

      state.posts = state.posts.concat(posts);
    });
  },
});

export const { postAdded, addReaction } = postSlice.actions;

export const postReducer = postSlice.reducer;
