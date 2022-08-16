import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { RootState } from "../store";
import { addPost, deletePost, fetchPosts, updatePostById } from "./postActions";

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

const postAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postAdapter.getInitialState({
  status: "idle",
  error: null,
});

const reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addReaction: (
      state,
      { payload }: PayloadAction<{ id: number; name: keyof ReactionsOptions }>
    ) => {
      const post = state.entities[payload.id];
      post && post.reactions[payload.name]++;
    },
  },
  extraReducers(builder) {
    builder.addCase(addPost.fulfilled, (state, { payload }) => {
      if (payload) {
        const post = { ...payload, date: new Date().toISOString(), reactions };
        postAdapter.addOne(state, post);
      }
    });
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
        .sort((a, b) => +b.date - +a.date);
      postAdapter.upsertMany(state, posts);
    });
    builder.addCase(updatePostById.fulfilled, (state, { payload }) => {
      payload && postAdapter.upsertOne(state, payload);
    });
    builder.addCase(deletePost.fulfilled, (state, { payload: postId }) => {
      postId && postAdapter.removeOne(state, postId);
    });
  },
});

export const { selectAll, selectById, selectIds } =
  postAdapter.getSelectors<RootState>((state) => state.posts);
export const { addReaction } = postSlice.actions;
export const postReducer = postSlice.reducer;
// const postIds = postAdapter.selectId()
