const initialState = {
    externos: [],
    loading: false,
    error: null,
};

function externosReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_EXTERNOS_SUCCESS':
            return {
                ...state,
                externos: action.payload,
            };
        case 'FETCH_EXTERNOS_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'ADD_EXTERNO_SUCCESS':
            return {
                ...state,
                externos: [...state.externos, action.payload],
                loading: false,
            };
        case 'ADD_EXTERNO_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'EDIT_EXTERNO_SUCCESS':
            return {
                ...state,
                externos: state.externos.map((externo) =>
                    externo._id === action.payload._id ? action.payload : externo
                ),
                loading: false,
            };
        case 'EDIT_EXTERNO_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'DELETE_EXTERNO_SUCCESS':
            return {
                ...state,
                externos: state.externos.filter(
                    (externo) => externo._id !== action.payload._id
                ),
                loading: false,
            };
        case 'DELETE_EXTERNO_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default externosReducer;
