import { Button, GridItem } from "@chakra-ui/react";
import { useAppDispatch } from "../../hooks/hooks";
import { addReaction, Post } from "../../redux/posts/postSlice";

const reactionEmoji: { [key: string]: string } = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

type ReactionButtonsProps = {
  post: Post;
};

function ReactionButtons({ post }: ReactionButtonsProps) {
  const dispatch = useAppDispatch();
  return (
    <>
      <GridItem display={"flex"} gap={2} justifyContent="center">
        {Object.entries(reactionEmoji).map(([name, emoji]) => (
          <Button
            key={name}
            onClick={() => dispatch(addReaction({ id: post.id, name }))}
          >
            {emoji} {post.reactions[name]}
          </Button>
        ))}
      </GridItem>
    </>
  );
}

export default ReactionButtons;
