import { getData, postaPI, putaPI, deleteAPI } from '../../utils/FetchData';

// Acciones para Zonas
export const fetchZonas = () => async (dispatch) => {
  try {
    const res = await getData('Ubicacion/zonas');
    dispatch({ type: 'FETCH_ZONAS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_ZONAS_FAILURE', payload: error.message });
  }
};

export const addZona = (data) => async (dispatch) => {
  try {
    const res = await postaPI('Ubicacion/zonas', data);
    dispatch({ type: 'ADD_ZONA_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'ADD_ZONA_FAILURE', payload: error.message });
  }
};

export const editZona = (id, data) => async (dispatch) => {
  try {
    const res = await putaPI(`Ubicacion/zonas/${id}`, data);
    dispatch({ type: 'EDIT_ZONA_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'EDIT_ZONA_FAILURE', payload: error.message });
  }
};

export const deleteZona = (id) => async (dispatch) => {
  try {
    const res = await deleteAPI(`Ubicacion/zonas/${id}`);
    dispatch({ type: 'DELETE_ZONA_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'DELETE_ZONA_FAILURE', payload: error.message });
  }
};

// Acciones para Ubicaciones
export const fetchUbicaciones = () => async (dispatch) => {
  try {
    const res = await getData('Ubicacion/ubicaciones');
    dispatch({ type: 'FETCH_UBICACIONES_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_UBICACIONES_FAILURE', payload: error.message });
  }
};

export const addUbicacion = (data) => async (dispatch) => {
  try {
    const res = await postaPI('Ubicacion/ubicaciones', data);
    dispatch({ type: 'ADD_UBICACION_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'ADD_UBICACION_FAILURE', payload: error.message });
  }
};

export const editUbicacion = (id, data) => async (dispatch) => {
  try {
    const res = await putaPI(`Ubicacion/ubicaciones/${id}`, data);
    dispatch({ type: 'EDIT_UBICACION_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'EDIT_UBICACION_FAILURE', payload: error.message });
  }
};

export const deleteUbicacion = (id) => async (dispatch) => {
  try {
    const res = await deleteAPI(`Ubicacion/ubicaciones/${id}`);
    dispatch({ type: 'DELETE_UBICACION_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'DELETE_UBICACION_FAILURE', payload: error.message });
  }
};
