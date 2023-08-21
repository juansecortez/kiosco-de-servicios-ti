// reducer.js
const initialState = {
  solicitudes: [],
  loading: false,
  error: null,
};

const reqMadeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SOLICITUDES_SUCCESS':
      return {
        ...state,
        solicitudes: [...action.payload],
        loading: false,
        error: null,
      };
    case 'FETCH_SOLICITUDES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reqMadeReducer;
