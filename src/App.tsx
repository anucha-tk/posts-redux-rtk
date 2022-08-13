import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
// import Header from "./components/Header";
import PostLists from "./components/postLists/PostLists";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="50vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {/* <Header /> */}
          <PostLists />
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
