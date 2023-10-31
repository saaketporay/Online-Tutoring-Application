import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface tokenState {
    token: string | undefined,
};

const initialState: tokenState = {
    token: undefined,
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        resetToken: (state) => {
            state.token = undefined;
        }
    },
});

export const { setToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
