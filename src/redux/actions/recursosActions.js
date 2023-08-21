import { getData, postaPI, putaPI, deleteAPI } from '../../utils/FetchData';

// Acción para obtener todos los recursos
export const fetchRecursos = () => {
    return async (dispatch) => {
  try {
    const res = await getData('recursos/getAllRecursos');
    dispatch({ type: 'FETCH_RECURSOS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_RECURSOS_FAILURE', payload: error.message });
  }
}};
// Acción para agregar un recurso
export const addRecurso = (data) => async (dispatch) => {
  try {
    const res = await postaPI('recursos/addRecurso', data);
    dispatch({ type: 'ADD_RECURSO_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'ADD_RECURSO_FAILURE', payload: error.message });
  }
};

// Acción para editar un recurso
export const editRecurso = (id, data) => async (dispatch) => {
  try {
    const res = await putaPI(`recursos/editRecurso/${id}`, data);
    dispatch({ type: 'EDIT_RECURSO_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'EDIT_RECURSO_FAILURE', payload: error.message });
  }
};

// Acción para eliminar un recurso
export const deleteRecurso = (id, token) => async (dispatch) => {
  try {
    const res = await deleteAPI(`recursos/deleteRecurso/${id}`, token);
    dispatch({ type: 'DELETE_RECURSO_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'DELETE_RECURSO_FAILURE', payload: error.message });
  }
};
