const initialState = {
  directions: [],
  management: [],
  leadership: [],
  informationSystems: [],
  resources: [],
  folders: [],
  databases: [],
  internet: [],
  earrings: [],
  error: null,
};

const selectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DIRECTIONS_SUCCESS':
      return {
        ...state,
        directions: action.payload,
        error: null,
      };
    case 'FETCH_MANAGEMENT_SUCCESS':
      return {
        ...state,
        management: action.payload,
        error: null,
      };
      case 'FETCH_RECURSOS_BY_TYPE_SUCCESS':
        return {
          ...state,
          loading: false,
        };
      case 'FETCH_RECURSOS_BY_TYPE_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    case 'FETCH_LEADERSHIP_SUCCESS':
      return {
        ...state,
        leadership: action.payload,
        error: null,
      };
    case 'FETCH_INFORMATION_SYSTEMS_SUCCESS':
      return {
        ...state,
        informationSystems: action.payload,
        error: null,
      };
    case 'FETCH_COMPUTER_RESOURCES_SUCCESS':
      return {
        ...state,
        resources: action.payload,
        error: null,
      };
    case 'FETCH_FOLDERS_SUCCESS':
      return {
        ...state,
        folders: action.payload,
        error: null,
      };
    case 'FETCH_DATABASES_SUCCESS':
      return {
        ...state,
        databases: action.payload,
        error: null,
      };
    case 'FETCH_INTERNET_SUCCESS':
      return {
        ...state,
        internet: action.payload,
        error: null,
      };
    case 'FETCH_EARRINGS_SUCCESS':
      return {
        ...state,
        earrings: action.payload,
        error: null,
      };
    case 'FETCH_DIRECTIONS_FAILURE':
    case 'FETCH_MANAGEMENT_FAILURE':
    case 'FETCH_LEADERSHIP_FAILURE':
    case 'FETCH_INFORMATION_SYSTEMS_FAILURE':
    case 'FETCH_COMPUTER_RESOURCES_FAILURE':
    case 'FETCH_FOLDERS_FAILURE':
    case 'FETCH_DATABASES_FAILURE':
    case 'FETCH_INTERNET_FAILURE':
    case 'FETCH_EARRINGS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default selectsReducer;
