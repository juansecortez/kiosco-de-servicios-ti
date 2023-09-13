import { getData } from '../../utils/FetchData';

// Acciones para obtener los datos del dispositivo
export const fetchDeviceData = (month, area, ubicacion, tipo) => async (dispatch) => {
  // Iniciar el loading antes de hacer la solicitud.
  dispatch({ type: 'ALERT', payload: { loading: true } });

  try {
    const res = await getData(`device/data/${month}/${area}/${ubicacion}/${tipo}`);
    
    // Ocultar el loading después de recibir respuesta.
    dispatch({ type: 'ALERT', payload: { loading: false } });
    
    dispatch({ type: 'FETCH_DEVICE_DATA_SUCCESS', payload: res.data });
    return res.data;  // Asegúrate de devolver los datos.
  } catch (error) {
    // Ocultar el loading en caso de error.
    dispatch({ type: 'ALERT', payload: { loading: false } });
    
    dispatch({ type: 'FETCH_DEVICE_DATA_FAILURE', payload: error.message });
    throw error;  // Lanza el error para manejarlo en el componente.
  }
};



// Acciones para listar tablas, áreas, ubicaciones y tipos
export const listTables = () => async (dispatch) => {
  try {
    const res = await getData('device/list/tables');
    dispatch({ type: 'LIST_TABLES_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LIST_TABLES_FAILURE', payload: error.message });
  }
};

export const listAreas = (month) => async (dispatch) => {
  try {
    const res = await getData(`device/list/areas/${month}`);
    dispatch({ type: 'LIST_AREAS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LIST_AREAS_FAILURE', payload: error.message });
  }
};

export const listUbicaciones = (month, area) => async (dispatch) => {
  try {
    const res = await getData(`device/list/ubicaciones/${month}/${area}`);
    dispatch({ type: 'LIST_UBICACIONES_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LIST_UBICACIONES_FAILURE', payload: error.message });
  }
};

export const listTipos = (month) => async (dispatch) => {
  try {
    const res = await getData(`device/list/tipos/${month}`);
    dispatch({ type: 'LIST_TIPOS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LIST_TIPOS_FAILURE', payload: error.message });
  }
};
export const fetchStatsByLocation = () => async (dispatch) => {
  try {
    const res = await getData('device/stats/location');
    dispatch({ type: 'FETCH_STATS_BY_LOCATION_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_STATS_BY_LOCATION_FAILURE', payload: error.message });
  }
};

export const fetchStatsByType = () => async (dispatch) => {
  try {
    const res = await getData('device/stats/type');
    dispatch({ type: 'FETCH_STATS_BY_TYPE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_STATS_BY_TYPE_FAILURE', payload: error.message });
  }
};

export const fetchStatsByArea = () => async (dispatch) => {
  try {
    const res = await getData('device/stats/area');
    dispatch({ type: 'FETCH_STATS_BY_AREA_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_STATS_BY_AREA_FAILURE', payload: error.message });
  }
};



export const fetchMetricsByState = () => async (dispatch) => {
  try {
    const res = await getData('device/stats/state');
    dispatch({ type: 'FETCH_METRICS_BY_STATE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_METRICS_BY_STATE_FAILURE', payload: error.message });
  }
};

export const fetchMonthlyServicesByArea = () => async (dispatch) => {
  try {
    const res = await getData('device/stats/servicesByArea');
    dispatch({ type: 'FETCH_MONTHLY_SERVICES_BY_AREA_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_MONTHLY_SERVICES_BY_AREA_FAILURE', payload: error.message });
  }
};

export const fetchTotalServicesByArea = () => async (dispatch) => {
  try {
    const res = await getData('device/stats/totalServicesByArea');
    dispatch({ type: 'FETCH_TOTAL_SERVICES_BY_AREA_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TOTAL_SERVICES_BY_AREA_FAILURE', payload: error.message });
  }
};

export const fetchServicesByJefatura = () => async (dispatch) => {
  try {
    const res = await getData('device/stats/servicesByJefatura');
    dispatch({ type: 'FETCH_SERVICES_BY_JEFATURA_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_SERVICES_BY_JEFATURA_FAILURE', payload: error.message });
  }
};

export const fetchServicesByIDTecnico = () => async (dispatch) => {
  try {
    const res = await getData('device/stats/servicesByIDTecnico');
    dispatch({ type: 'FETCH_SERVICES_BY_IDTECNICO_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_SERVICES_BY_IDTECNICO_FAILURE', payload: error.message });
  }
};
