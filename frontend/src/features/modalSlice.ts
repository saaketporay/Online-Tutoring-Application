import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  value: boolean,
};

const initialState: ModalState = {
  value: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    toggleModal: (state) => {
      state.value = !state.value
    },
  },
});

export const { toggleModal } = modalSlice.actions

export default modalSlice.reducer
