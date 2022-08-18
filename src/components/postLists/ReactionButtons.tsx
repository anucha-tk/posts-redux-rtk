import { Button, GridItem } from "@chakra-ui/react";
import { Post, useUpdateReactionMutation } from "../../redux/posts/postSlice";

const reactionEmoji: { [key: string]: string } = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

function ReactionButtons({ post }: { post: Post }) {
  const [update] = useUpdateReactionMutation();

  const reactionHandler = (name: string) => () => {
    const newValue = post.reactions[name] + 1;
    update({
      id: post.id,
      reactions: { ...post.reactions, [name]: newValue },
    });
  };
  return (
    <GridItem display={"flex"} gap={2} justifyContent="center">
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <Button key={name} onClick={reactionHandler(name)}>
          {emoji} {post.reactions[name]}
        </Button>
      ))}
    </GridItem>
  );
}

export default ReactionButtons;
