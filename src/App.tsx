import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  Button,
  Input,
  InputGroup,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Header from "./components/Header";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="50vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Header />
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
