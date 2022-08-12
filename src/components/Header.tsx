import {
  Box,
  Text,
  Button,
  ButtonGroup,
  Flex,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import {
  decrement,
  increment,
  reset,
  incrementByAmount,
} from "../redux/counter/counterSlice";

export default function Header() {
  const { count } = useAppSelector(({ counter }) => counter);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(+event.target.value);

  const incrementHandler = () => {
    dispatch(increment());
  };

  const decrementHandler = () => {
    dispatch(decrement());
  };

  const resetHandler = () => {
    dispatch(reset());
  };

  const incrementByAmountHandler = (amount: number) => {
    dispatch(incrementByAmount(amount));
  };
  return (
    <Flex direction={"column"} align="center" justify={"center"} gap={10}>
      <Box>
        <Text fontSize="lg">{count}</Text>
      </Box>
      <ButtonGroup gap="10">
        <Button colorScheme="blue" onClick={incrementHandler}>
          Increment
        </Button>
        <Button colorScheme="red" onClick={decrementHandler}>
          Decrement
        </Button>
        <Button colorScheme="orange" onClick={resetHandler}>
          reset
        </Button>
      </ButtonGroup>
      <Box>
        <InputGroup size="md" gap={2}>
          <Input
            placeholder="value"
            value={value}
            size={"md"}
            width="auto"
            onChange={handleChange}
          />
          <Button
            colorScheme="blue"
            onClick={() => incrementByAmountHandler(value)}
          >
            submit
          </Button>
        </InputGroup>
      </Box>
    </Flex>
  );
}
