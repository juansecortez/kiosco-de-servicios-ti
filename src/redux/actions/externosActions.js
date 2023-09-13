import { getData, postaPI, putaPI, deleteAPI } from '../../utils/FetchData';

// Acción para obtener todos los externos
export const fetchExternos = () => {
    return async (dispatch) => {
        try {
            const res = await getData('externos/externos');
            dispatch({ type: 'FETCH_EXTERNOS_SUCCESS', payload: res.data });
        } catch (error) {
            dispatch({ type: 'FETCH_EXTERNOS_FAILURE', payload: error.message });
        }
    }
};

// Acción para agregar un externo
export const addExterno = (data) => async (dispatch) => {
    try {
        const res = await postaPI('externos/externos', data);
        dispatch({ type: 'ADD_EXTERNO_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'ADD_EXTERNO_FAILURE', payload: error.message });
    }
};

// Acción para editar un externo
export const editExterno = (id, data) => async (dispatch) => {
    try {
        const res = await putaPI(`externos/externos/${id}`, data);
        dispatch({ type: 'EDIT_EXTERNO_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'EDIT_EXTERNO_FAILURE', payload: error.message });
    }
};

// Acción para eliminar un externo
export const deleteExterno = (id) => async (dispatch) => {
    try {
        const res = await deleteAPI(`externos/externos/${id}`);
        dispatch({ type: 'DELETE_EXTERNO_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'DELETE_EXTERNO_FAILURE', payload: error.message });
    }
};
