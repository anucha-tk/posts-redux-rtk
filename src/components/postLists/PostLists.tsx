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
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { postAdded, PostState } from "../../redux/posts/postSlice";
import { useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import ReactionButtons from "./ReactionButtons";

type postInputs = Partial<PostState>;
function PostLists() {
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(({ posts }) => posts);

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
    <Box>
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
        <FormControl isInvalid={!!errors.content} isRequired>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Input
            id="content"
            placeholder="content"
            isRequired
            {...register("content", {
              required: "content is required",
            })}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
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
              key={post.id}
              p={2}
              shadow="md"
              borderWidth="0.25em"
              backgroundColor={colorMode === "light" ? "#f3f3f3" : "000"}
            >
              <Heading fontSize="xl">{post.title}</Heading>
              <Text>Id: {post.id}</Text>
              <Text>Content: {post.content}</Text>
              <Text>Date: {timePeriod} ago</Text>
              <ReactionButtons post={post} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}

export default PostLists;
