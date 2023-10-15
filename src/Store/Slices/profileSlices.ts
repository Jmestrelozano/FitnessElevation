import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserProfile, IProfileSlice} from '../../interfaces';

const initialState: IProfileSlice = {
  userProfile: {
    weight: '',
    height: '',
    name: '',
    age: '',
  },
};

export const profileSlices = createSlice({
  name: 'profileSlice',
  initialState: initialState,
  reducers: {
    setSaveProfile: (state, action: PayloadAction<IUserProfile>) => {
      console.log(action.payload);
      state.userProfile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setSaveProfile} = profileSlices.actions;

export default profileSlices.reducer;
