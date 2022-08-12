import { createSlice } from "@reduxjs/toolkit";
type CounterState = {
  count: number;
};
const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, { payload }) => {
      state.count += payload;
    },
  },
});

// action
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;
// reducer
export const counterReducer = counterSlice.reducer;
