const initialState = {
  loading: false,
  error: null,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHORIZE_REQUEST_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'AUTHORIZE_REQUEST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'REJECT_REQUEST_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'REJECT_REQUEST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case 'DONE_REQUEST_SUCCESS':
        return {
          ...state,
          loading: false,
        };
      case 'DONE_REQUEST_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
};

export default requestReducer;
