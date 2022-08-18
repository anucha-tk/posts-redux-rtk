import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { postApi } from "./postApi";

interface KeyStringObj {
  [key: string]: any;
}

export interface ReactionsOptions extends KeyStringObj {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export type MutationPost = {
  userId: number;
  title: string;
  body: string;
  date: string;
  reactions: ReactionsOptions;
};

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

const initialState = postAdapter.getInitialState();

export const extendedPostsApiSlice = postApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<Post>, void>({
      query: () => "/posts",
      // keepUnusedDataFor: 5, // todo testing cache time
      providesTags: (result) =>
        result
          ? [...result.ids.map((id) => ({ type: "Post" as const, id }))]
          : ["Post"],
      transformResponse: (res: Post[]) =>
        postAdapter.setAll(initialState, res) as never,
    }),
    getPostById: builder.query<EntityState<Post>, string>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),
    addPost: builder.mutation<void, MutationPost>({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<void, { id: string; data: MutationPost }>({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<void, { postId: string }>({
      query: ({ postId }) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    updateReaction: builder.mutation<
      void,
      { id: number; reactions: ReactionsOptions }
    >({
      query: ({ id, reactions }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: { reactions }, //<-- destructure obj
      }),
      async onQueryStarted({ id, reactions }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedPostsApiSlice.util.updateQueryData(
            "getPosts",
            undefined,
            (draft) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const post = draft.entities[id];
              if (post) post.reactions = reactions;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

// returns the query result object
const selectPostsResult = extendedPostsApiSlice.endpoints.getPosts.select();

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUpdateReactionMutation,
} = extendedPostsApiSlice;

// with memorize
export const {
  selectAll: selectAllPosts,
  selectById,
  selectIds,
} = postAdapter.getSelectors<RootState>(
  (state) => selectPostsData(state) ?? initialState
);
