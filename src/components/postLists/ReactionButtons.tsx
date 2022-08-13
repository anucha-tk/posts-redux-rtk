import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "../../hooks/hooks";
import { addReaction, PostState } from "../../redux/posts/postSlice";
const reactionEmoji: { [key: string]: string } = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

type ReactionButtonsProps = {
  post: PostState;
};

function ReactionButtons({ post }: ReactionButtonsProps) {
  const dispatch = useAppDispatch();
  return (
    <>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <Button
          key={name}
          //   @ts-ignore
          onClick={() => dispatch(addReaction({ id: post.id, name }))}
        >
          {/* @ts-ignore */}
          {emoji} {post.reactions[name]}
        </Button>
      ))}
    </>
  );
}

export default ReactionButtons;
