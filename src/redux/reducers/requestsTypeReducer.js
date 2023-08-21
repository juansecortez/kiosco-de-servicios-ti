const initialState = {
  userRegistration: [],
  systemsID: [],
  resourceID: [],
  folderID: [],
  databaseID: [],
  internetID: [],
  error: null,
};

const requestsTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_REGISTRATION_SUCCESS':
      return {
        ...state,
        userRegistration: action.payload,
        error: null,
      };
    case 'FETCH_SYSTEM_ACCESS_SUCCESS':
      return {
        ...state,
        systemsID: action.payload,
        error: null,
      };
    case 'FETCH_RESOURCE_ACCESS_SUCCESS':
      return {
        ...state,
        resourceID: action.payload,
        error: null,
      };
    case 'FETCH_FOLDER_ACCESS_SUCCESS':
      return {
        ...state,
        folderID: action.payload,
        error: null,
      };
    case 'FETCH_DATABASE_ACCESS_SUCCESS':
      return {
        ...state,
        databaseID: action.payload,
        error: null,
      };
    case 'FETCH_INTERNET_ACCESS_SUCCESS':
      return {
        ...state,
        internetID: action.payload,
        error: null,
      };
    case 'FETCH_USER_REGISTRATION_FAILURE':
    case 'FETCH_SYSTEM_ACCESS_FAILURE':
    case 'FETCH_RESOURCE_ACCESS_FAILURE':
    case 'FETCH_FOLDER_ACCESS_FAILURE':
    case 'FETCH_DATABASE_ACCESS_FAILURE':
    case 'FETCH_INTERNET_ACCESS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default requestsTypeReducer;
