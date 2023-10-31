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
    },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
