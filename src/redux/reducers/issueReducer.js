const initialState = {
    issues: [],
    loading: false,
    error: null,
};

function issueReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ISSUES_SUCCESS':
            return {
                ...state,
                issues: action.payload,
            };

        case 'FETCH_ISSUES_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
            case 'FETCH_ISSUES_BY_TYPE_SUCCESS':
                return {
                    ...state,
                    issues: action.payload,
                };
    
            case 'FETCH_ISSUES_BY_TYPE_FAILURE':
                return {
                    ...state,
                    error: action.payload,
                };
        case 'ADD_ISSUE_SUCCESS':
            return {
                ...state,
                issues: [...state.issues, action.payload],
                loading: false,
            };
        case 'ADD_ISSUE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'EDIT_ISSUE_SUCCESS':
            return {
                ...state,
                issues: state.issues.map((issue) =>
                    issue._id === action.payload._id ? action.payload : issue
                ),
                loading: false,
            };
        case 'EDIT_ISSUE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'DELETE_ISSUE_SUCCESS':
            return {
                ...state,
                issues: state.issues.filter(
                    (issue) => issue._id !== action.payload._id
                ),
                loading: false,
            };
        case 'DELETE_ISSUE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default issueReducer;
