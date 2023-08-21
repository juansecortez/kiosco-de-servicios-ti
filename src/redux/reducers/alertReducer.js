// Estado inicial
const initialState = {
  loading: null,
  success: null,
  errors: null,
};

// Reducer
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALERT':
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
