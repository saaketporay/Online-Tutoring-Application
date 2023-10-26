import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  showModal: boolean,
  appointmentId: string | undefined,
};

const initialState: ModalState = {
  showModal: false,
  appointmentId: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    setAppointmentId: (state, action: PayloadAction<string>) => {
      state.appointmentId = action.payload;
    },
    clearAppointmentId: (state) => {
      state.appointmentId = undefined;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
