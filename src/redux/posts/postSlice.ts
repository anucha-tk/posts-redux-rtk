import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";
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

const reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };

const initialState: PostState = { posts: [], status: "idle", error: null };
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addReaction: (
      state,
      { payload }: PayloadAction<{ id: number; name: keyof ReactionsOptions }>
    ) => {
      const post = state.posts.find((post) => post.id === payload.id);
      post && post.reactions[payload.name]++;
    },
  },
  extraReducers(builder) {
    builder.addCase(addPost.fulfilled, (state, { payload }) => {
      if (payload) {
        const post = { ...payload, date: new Date().toISOString(), reactions };
        state.posts.unshift(post);
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

      state.posts = state.posts.concat(posts);
    });
    builder.addCase(updatePostById.fulfilled, (state, { payload }) => {
      if (payload) {
        const oldReactions = state.posts.find(
          (post) => post.id === payload.id
        )?.reactions;
        const posts = state.posts.filter((post) => post.id !== payload.id);
        if (oldReactions) {
          const updatePost = {
            ...payload,
            reactions: oldReactions,
            date: new Date().toISOString(),
          };
          state.posts = [updatePost, ...posts];
        }
      }
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id + "" !== payload);
    });
  },
});

export const { addReaction } = postSlice.actions;
export const postReducer = postSlice.reducer;
