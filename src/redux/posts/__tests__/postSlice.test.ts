import { store } from "../../store";
import { extendedPostsApiSlice } from "../postSlice";

test("should return valid createEntityAdapter", async () => {
  const postAdapter = await store.dispatch(
    extendedPostsApiSlice.endpoints.getPosts.initiate()
  );
  expect(postAdapter.data).toHaveProperty("ids");
  expect(postAdapter.data).toHaveProperty("entities");
});

test("should transformResponse date and reactions", async () => {
  const postAdapter = await store.dispatch(
    extendedPostsApiSlice.endpoints.getPosts.initiate()
  );

  expect(postAdapter.data?.entities["2"]).toHaveProperty("date");
  expect(postAdapter.data?.entities["2"]).toHaveProperty("reactions");

  expect(postAdapter.data?.entities["2"]?.reactions).toHaveProperty("thumbsUp");
  expect(postAdapter.data?.entities["2"]?.reactions).toHaveProperty("wow");
  expect(postAdapter.data?.entities["2"]?.reactions).toHaveProperty("heart");
  expect(postAdapter.data?.entities["2"]?.reactions).toHaveProperty("rocket");
  expect(postAdapter.data?.entities["2"]?.reactions).toHaveProperty("coffee");
});
