const initialState = {
    zonas: [],
    ubicaciones: [],
    loading: false,
    error: null,
};

function zonasUbicacionReducer(state = initialState, action) {
    switch (action.type) {
        // Reducers para Zonas
        case 'FETCH_ZONAS_SUCCESS':
            return { ...state, zonas: action.payload };
        case 'FETCH_ZONAS_FAILURE':
            return { ...state, error: action.payload };
        case 'ADD_ZONA_SUCCESS':
            return { ...state, zonas: [...state.zonas, action.payload] };
        case 'ADD_ZONA_FAILURE':
            return { ...state, error: action.payload };
        case 'EDIT_ZONA_SUCCESS':
            return {
                ...state,
                zonas: state.zonas.map((zona) => zona.id === action.payload.id ? action.payload : zona),
            };
        case 'EDIT_ZONA_FAILURE':
            return { ...state, error: action.payload };
        case 'DELETE_ZONA_SUCCESS':
            return { ...state, zonas: state.zonas.filter((zona) => zona.id !== action.payload.id) };
        case 'DELETE_ZONA_FAILURE':
            return { ...state, error: action.payload };

        // Reducers para Ubicaciones
        case 'FETCH_UBICACIONES_SUCCESS':
            return { ...state, ubicaciones: action.payload };
        case 'FETCH_UBICACIONES_FAILURE':
            return { ...state, error: action.payload };
        case 'ADD_UBICACION_SUCCESS':
            return { ...state, ubicaciones: [...state.ubicaciones, action.payload] };
        case 'ADD_UBICACION_FAILURE':
            return { ...state, error: action.payload };
        case 'EDIT_UBICACION_SUCCESS':
            return {
                ...state,
                ubicaciones: state.ubicaciones.map((ubicacion) => ubicacion.ID === action.ubicacion.idpayload.id ? action.payload : ubicacion),
            };
        case 'EDIT_UBICACION_FAILURE':
            return { ...state, error: action.payload };
        case 'DELETE_UBICACION_SUCCESS':
            return { ...state, ubicaciones: state.ubicaciones.filter((ubicacion) => ubicacion.ID !== action.payload.id) };
        case 'DELETE_UBICACION_FAILURE':
            return { ...state, error: action.payload };

        default:
            return state;
    }
}

export default zonasUbicacionReducer;
