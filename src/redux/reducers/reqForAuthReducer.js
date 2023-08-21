// reducer.js
const initialState = {
  solicitud: [],
  loading: false,
  error: null,
};

const reqForAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SOLICITUD_SUCCESS':
      return {
        ...state,
        solicitud: [...action.payload],
        loading: false,
        error: null,
      };
    case 'FETCH_SOLICITUD_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reqForAuthReducer;
