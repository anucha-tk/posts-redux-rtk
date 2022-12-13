import { render, screen, waitFor } from "../../../test-utils";
import PostLists from "../PostLists";
import userEvent from "@testing-library/user-event";
import { store } from "../../../redux/store";
import { extendedPostsApiSlice } from "../../../redux/posts/postSlice";

const setup = () => {
  return render(<PostLists />);
};

test("should return loading when fetching", () => {
  setup();
  const loading = screen.getByText(/loading.../i);
  expect(loading).toBeInTheDocument();
});

// test("should return text post lists", async () => {
//   setup();
//   const postsList = await screen.findByText(/Post Lists/);
//   expect(postsList).toBeInTheDocument();
// });

// test("should render title, body, postId", async () => {
//   setup();
//   const title = await screen.findByRole("heading", { name: /Title A/ });
//   const body = await screen.findByRole("heading", { name: /Body A/i });
//   const postId = await screen.findByRole("heading", { name: /Id: 2/i });

//   expect(title).toBeInTheDocument();
//   expect(body).toBeInTheDocument();
//   expect(postId).toBeInTheDocument();
// });

// test("should render new post when add post", async () => {
//   setup();
//   const titleInput = (await screen.findByRole("textbox", {
//     name: /title/i,
//   })) as HTMLInputElement;
//   const bodyInput = (await screen.findByRole("textbox", {
//     name: /title/i,
//   })) as HTMLInputElement;

//   userEvent.clear(titleInput);
//   userEvent.type(titleInput, "title XYZ");
//   userEvent.clear(bodyInput);
//   userEvent.type(bodyInput, "body ABC");
//   const submitButton = await screen.findByRole("button", {
//     name: /submit/i,
//   });
//   userEvent.click(submitButton);

//   // const newPost = await screen.findByRole("heading", { name: /title XYZ/i });
//   // expect(newPost).toBeInTheDocument();

//   await waitFor(async () => {
//     const data = await store.dispatch(
//       extendedPostsApiSlice.endpoints.getPosts.initiate()
//     );
//     console.log(data.data?.entities);
//     // expect(titleInput.value).toBe("a");
//   });
// });
