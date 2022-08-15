import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Post, postAdded } from "../../redux/posts/postSlice";
import { useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import ReactionButtons from "./ReactionButtons";
import { fetchPosts } from "../../redux/posts/postActions";
import { nanoid } from "@reduxjs/toolkit";

type postInputs = Partial<Post>;

function PostLists() {
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(({ posts }) => posts.posts);
  const status = useAppSelector(({ posts }) => posts.status);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<postInputs>();

  function onSubmit(values: postInputs) {
    dispatch(postAdded(values));
  }

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Box>
        {/* <> */}
        {status === "loading" ? (
          <Spinner size="xl" />
        ) : (
          <>
            <Heading color={"tomato"} as="i" fontSize="2em">
              Post Lists
            </Heading>
            <Divider my={3} />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormControl isInvalid={!!errors.title} isRequired>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  placeholder="title"
                  isRequired
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.body} isRequired>
                <FormLabel htmlFor="body">body</FormLabel>
                <Input
                  id="body"
                  placeholder="body"
                  isRequired
                  {...register("body", {
                    required: "body is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.body && errors.body.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
            <Divider my={3} />
            <Grid
              templateColumns="1fr 1fr"
              justifyContent={"stretch"}
              rowGap={2}
              columnGap={2}
            >
              {posts.map((post) => {
                const date = parseISO(post.date);
                const timePeriod = formatDistanceToNow(date);

                return (
                  <GridItem
                    key={`${nanoid()}`}
                    p={2}
                    shadow="md"
                    borderWidth="0.25em"
                    backgroundColor={colorMode === "light" ? "#f3f3f3" : "000"}
                  >
                    <Heading fontSize="xl" color={"orange"}>
                      {post.title}
                    </Heading>
                    <Text>Id: {post.id}</Text>
                    <Text>{post.body}</Text>
                    <Text color={"blue"}>{timePeriod} ago</Text>
                    <ReactionButtons post={post} />
                  </GridItem>
                );
              })}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}

export default PostLists;
