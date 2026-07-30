import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isMenuOpen: false,
    activeTrack: 'Backend',
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    setActiveTrack: (state, action) => {
      state.activeTrack = action.payload;
    }
  }
});

export const { toggleMenu, setMenuOpen, setActiveTrack } = uiSlice.actions;
export default uiSlice.reducer;
