// // src/redux/store.js

// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../redux/reducers/userReducer'; // Import your user reducer
// import { thunk } from 'redux-thunk'; // Correct way to import thunk

// const store = configureStore({
//   reducer: {
//     user: userReducer, // Replace with your actual reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(thunk), // Add thunk middleware
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; // Correct the import to match the usage below

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure this matches the imported reducer
  },
});

export default store;


