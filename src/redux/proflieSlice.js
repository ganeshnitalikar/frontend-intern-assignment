import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
    searchQuery: "",
  },
  reducers: {
    setProfiles(state, action) {
      state.profiles = action.payload;
    },
    addProfile(state, action) {
      state.profiles.push(action.payload);
    },
    deleteProfile(state, action) {
      state.profiles = state.profiles.filter(
        (profile) => profile.id !== action.payload
      );
    },
    updateProfile(state, action) {
      const index = state.profiles.findIndex(
        (profile) => profile.id === action.payload.id
      );
      if (index !== -1) state.profiles[index] = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setProfiles,
  addProfile,
  deleteProfile,
  updateProfile,
  setSearchQuery,
} = profileSlice.actions;
export default profileSlice.reducer;
