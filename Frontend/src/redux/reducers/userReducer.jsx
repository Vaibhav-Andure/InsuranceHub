// src/redux/reducers/userReducer.js

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_USER_SUCCESS':
        return { ...state, loading: false, user: action.payload, isAuthenticated: true };
      case 'FETCH_USER_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default userReducer;
  