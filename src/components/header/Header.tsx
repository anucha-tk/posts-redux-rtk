import { Box, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">Post App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2" mr={2}>
        <Link to="/">All Posts</Link>
      </ButtonGroup>
    </Flex>
  );
}

export default Header;
