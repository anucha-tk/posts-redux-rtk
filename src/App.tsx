import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Header from "./components/header/Header";
import EditPost from "./components/postLists/EditPost";
import PostLists from "./components/postLists/PostLists";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="50vh" m={3}>
          <Header />
          <ColorModeSwitcher justifySelf="flex-end" />
          <Routes>
            <Route path="/" element={<PostLists />} />
            <Route path=":postId" element={<EditPost />} />
          </Routes>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
