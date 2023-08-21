// Estado inicial
const initialState = {
  user: null,
  message: null,
  access_token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
