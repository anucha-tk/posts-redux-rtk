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
  IconButton,
  Input,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/hooks";
import {
  Post,
  selectAllPosts,
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../redux/posts/postSlice";
import { formatDistanceToNow, parseISO } from "date-fns";
import ReactionButtons from "./ReactionButtons";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

type postInputs = Partial<Post>;

function PostLists() {
  const posts = useAppSelector(selectAllPosts);

  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { isLoading } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<postInputs>();

  async function onSubmit({ title, body }: postInputs) {
    const reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };

    try {
      if (title && body) {
        addPost({
          title,
          body,
          userId: 1,
          date: new Date().toISOString(),
          reactions,
        });
      }
    } catch (error) {
      toast({
        title: "Post create error",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      toast({
        title: "Post created successful",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
    }
  }

  async function onDelete(id: string) {
    try {
      deletePost({ postId: id });
    } catch (error) {
      toast({
        title: "Post delete error",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      toast({
        title: "Post delete successful",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
    }
  }

  return (
    <>
      <Box
        display="grid"
        justifyItems={"center"}
        alignItems="center"
        alignContent="center"
        gap={4}
      >
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <>
            <Grid w="100%" alignContent="center" justifyItems={"center"}>
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
            </Grid>
            <Grid
              templateColumns={["1fr", "1f 1f1", "1fr 1fr", "1fr 1fr 1fr"]}
              justifyContent={"stretch"}
              rowGap={2}
              columnGap={2}
            >
              {posts?.map((post) => {
                const date = parseISO(post.date);
                const timePeriod = formatDistanceToNow(date);

                return (
                  <GridItem
                    key={post.id}
                    p={2}
                    shadow="md"
                    borderWidth="0.25em"
                    rounded="md"
                    boxShadow="base"
                    backgroundColor={colorMode === "light" ? "#f3f3f3" : "000"}
                    display="grid"
                    gap={2}
                  >
                    <GridItem
                      display={"flex"}
                      justifyContent={"flex-end"}
                      my={2}
                      gap={2}
                    >
                      <IconButton
                        onClick={() => navigate(`/${post.id}`)}
                        aria-label="edit"
                        color={"green"}
                        icon={<EditIcon />}
                      ></IconButton>
                      <IconButton
                        onClick={() => onDelete(post.id + "")}
                        aria-label="delete"
                        color={"red"}
                        icon={<DeleteIcon />}
                      />
                    </GridItem>

                    <Heading fontSize="xl" color={"orange"}>
                      {post.title}
                    </Heading>
                    <Heading fontSize="sm" as="h5">
                      Id: {post.id}
                    </Heading>
                    <Heading fontSize="sm" as="h5">
                      {post.body}
                    </Heading>
                    <Heading fontSize="sm" as="h5" color={"blue"}>
                      {timePeriod} ago
                    </Heading>
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
