import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

type PostApiResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get(BASE_URL);
  return res.data as PostApiResponse[];
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data: { title: string; body: string }) => {
    try {
      const res = await axios.post(`${BASE_URL}`, data);
      return res.data as PostApiResponse;
    } catch (error) {}
  }
);

export const updatePostById = createAsyncThunk(
  "post/fetchPostById",
  async ({
    postId,
    title,
    body,
  }: {
    postId: string;
    title: string;
    body: string;
  }) => {
    try {
      const res = await axios.put(`${BASE_URL}/${postId}`, { title, body });
      return res.data as PostApiResponse;
    } catch (error) {}
  }
);

export const deletePost = createAsyncThunk(
  "post/deleteById",
  async (postId: string) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${postId}`);
      if (res.status === 200) return postId;
    } catch (error) {}
  }
);
