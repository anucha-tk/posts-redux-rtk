import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export type PostApiResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
}[];

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get(BASE_URL, { timeout: 2000 });
  return res.data as PostApiResponse;
});
