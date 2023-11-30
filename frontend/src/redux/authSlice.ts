import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface authState {
  token: string;
  expiration: string;
  user_type: "student" | "tutor" | '';
  email: string;
};

const initialState: authState = {
  token: '',
  expiration: '',
  user_type: '',
  email: '',
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setExpiration: (state, action: PayloadAction<string>) => {
      state.expiration = action.payload;
    },
    setUserType: (state, action: PayloadAction<"student" | "tutor">) => {
      state.user_type = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.token = '';
      state.expiration = '';
      state.user_type = '';
      state.email = '';
    },
  },
});

export const {
  setToken,
  setExpiration,
  setUserType,
  setEmail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
