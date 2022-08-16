import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Post, selectById } from "../../redux/posts/postSlice";
import { useEffect } from "react";
import { updatePostById } from "../../redux/posts/postActions";

type PostInputs = Partial<Post>;

function EditPost() {
  const { postId } = useParams();
  const post = useAppSelector((state) => selectById(state, postId + ""));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<PostInputs>({ mode: "onChange" });

  const onSubmit = async (value: PostInputs) => {
    try {
      if (postId && value.title && value.body && post) {
        dispatch(
          updatePostById({
            id: +postId,
            title: value.title,
            body: value.body,
            userId: post?.userId,
            reactions: post?.reactions,
            date: new Date().toISOString(),
          })
        );
      }
    } catch (error) {
      toast({
        title: "Post updated error",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      toast({
        title: "Post updated successful",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    }
  };

  useEffect(() => {
    setValue("title", post?.title);
    setValue("body", post?.body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Heading as={"i"}>Post ID: {postId}</Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl isInvalid={!!errors.title} isRequired>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            placeholder="title"
            isRequired
            {...register("title", {
              required: "title is required",
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.body} isRequired>
          <FormLabel htmlFor="body">body</FormLabel>
          <Textarea
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
          disabled={!isDirty || !isValid}
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default EditPost;
