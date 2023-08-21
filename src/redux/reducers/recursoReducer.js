const initialState = {
    recursos: [],
    loading: false,
    error: null,
};

function recursoReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_RECURSOS_SUCCESS':
            return {
                ...state,
                recursos: action.payload,
            };

        case 'FETCH_RECURSOS_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'ADD_RECURSO_SUCCESS':
            return {
                ...state,
                recursos: [...state.recursos, action.payload],
                loading: false,
            };
        case 'ADD_RECURSO_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'EDIT_RECURSO_SUCCESS':
            return {
                ...state,
                recursos: state.recursos.map((recurso) =>
                    recurso._id === action.payload._id ? action.payload : recurso
                ),
                loading: false,
            };
        case 'EDIT_RECURSO_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'DELETE_RECURSO_SUCCESS':
            return {
                ...state,
                recursos: state.recursos.filter(
                    (recurso) => recurso._id !== action.payload._id
                ),
                loading: false,
            };
        case 'DELETE_RECURSO_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default recursoReducer;
