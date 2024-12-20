import {
  fetchSavedHomesFailure,
  fetchSavedHomesStart,
  fetchSavedHomesSuccess,
} from '../redux/savedHomes/savedHomesSlice';

// Function to fetch saved homes from the server
const fetchSavedHomesFromServer = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}/savedHomes`);
    const data = await response.json();

    if (data.success) {
      return data.savedHomes; // Return fetched saved homes
    } else {
      throw new Error('Failed to fetch saved homes'); // Throw error for failure
    }
  } catch (error) {
    throw new Error(error.message); // Propagate error message
  }
};

// Function to fetch and dispatch saved homes to Redux store
export const fetchSavedHomesAndDispatch = async (dispatch, userId) => {
  dispatch(fetchSavedHomesStart()); // Start loading state in Redux

  try {
    const savedHomes = await fetchSavedHomesFromServer(userId); // Fetch saved homes
    dispatch(fetchSavedHomesSuccess(savedHomes)); // Dispatch success action with data
  } catch (error) {
    dispatch(fetchSavedHomesFailure(error.message)); // Dispatch failure action with error
  }
};
