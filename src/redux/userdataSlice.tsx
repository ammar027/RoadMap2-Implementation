import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  userName: '',
  userEmail: '',
};

const userdataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isSignedIn = true;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.userName = '';
      state.userEmail = '';
    },
  },
});

export const { signIn, signOut } = userdataSlice.actions;
export default userdataSlice.reducer;
