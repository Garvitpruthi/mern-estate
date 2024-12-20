// savedHomesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  savedHomes: [],   // Stores saved homes
  loading: false,
  error: null,
};

const savedHomesSlice = createSlice({
  name: 'savedHomes',
  initialState,
  reducers: {
    fetchSavedHomesStart: (state) => {
      state.loading = true;
    },
    fetchSavedHomesSuccess: (state, action) => {
      state.loading = false;
      state.savedHomes = action.payload;
    },
    fetchSavedHomesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSavedHome: (state, action) => {
      if(!state.savedHomes.some((home) => home === action.payload)){
        state.savedHomes.push(action.payload);
      }
    },
    removeSavedHome: (state, action) => {
      // Ensure the id is being compared correctly
      state.savedHomes = state.savedHomes.filter(
        (home) => home !== action.payload // Assuming `savedHomes` contains only ids
      );
    },
  },
});

export function addSavedHomeAsync(homeid, userid){
  // const userdata = useSelector((state)=>state.user.currentUser);
  // console.log(userdata,"😂😂😂😂");
  console.log(`backend m code bhejne se phle add krne ke liye property id is ${homeid} and user id is ${userid}`)
  return async (dispatch) => {
    try {
      const response = await fetch('/api/listing/savehome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ homeId: homeid, userId: userid}),
      });

      const data = await response.json();
      console.log("data is ", data, "\n ", data.success);

      if(data.success) {
        dispatch(addSavedHome(homeid));
        console.log('save home m, jo dispatch kr rhe h vo h homeid', homeid);
      }
    } catch (error) {
      console.error(`Error adding saved home:`, error);
    }
  };
}

export function removeSavedHomeAsync(homeid, userid){
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/listing/removehome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ homeId: homeid, userId: userid})
      });
      const data = await response.json();

      if(data.success) {
        dispatch(removeSavedHome(homeid));
      }
    } catch (error) {
      console.error('Error removing saved home:', error);
    }
  }
}

export const { fetchSavedHomesStart, fetchSavedHomesSuccess, fetchSavedHomesFailure, addSavedHome, removeSavedHome } = savedHomesSlice.actions;
export default savedHomesSlice.reducer;