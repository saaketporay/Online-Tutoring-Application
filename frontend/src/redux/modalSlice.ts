import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  showModal: boolean,
  appointmentId: number | undefined,
};

const initialState: ModalState = {
  showModal: false,
  appointmentId: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setAppointmentId: (state, action: PayloadAction<number>) => {
      state.appointmentId = action.payload;
    },
    clearAppointmentId: (state) => {
      state.appointmentId = undefined;
    },
  },
});

export const { setShowModal, setAppointmentId, clearAppointmentId } = modalSlice.actions;

export default modalSlice.reducer;
