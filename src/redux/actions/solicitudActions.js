import {
    postaPI,
    getData,
    getDataAPI,
    putaPI,
  } from '../../utils/FetchData'; // Asegúrate de que la ruta sea correcta
  
  // Cambiar estado de servicio
  export const cambiarEstadoServicio = (url, data) => async (dispatch) => {
    try {
      const res = await putaPI(url, data);
      dispatch({
        type: 'CAMBIAR_ESTADO_SERVICIO_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'CAMBIAR_ESTADO_SERVICIO_FAILURE',
        payload: error.message,
      });
    }
  };
  export const getServiceById = (url) => async (dispatch) => {
    try {
      const response = await getData(url);
        
      if (!response.ok) {
        throw new Error('La respuesta de la API no es correcta');
      }
    
      const serviceArray = await response.json();
      const service = serviceArray[0];
      dispatch({ type: 'GET_SERVICE_BY_ID_SUCCESS', payload: service });
    } catch (error) {
      const errorInfo = {
        message: error.message,
      };
    
      dispatch({ type: 'GET_SERVICE_BY_ID_FAILURE', payload: errorInfo });
    }
  };
  
  // Crear solicitud
  export const crearSolicitud = (url, post) => async (dispatch) => {
    try {
      const res = await postaPI(url, post);
      dispatch({
        type: 'CREAR_SOLICITUD_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'CREAR_SOLICITUD_FAILURE',
        payload: error.message,
      });
    }
  };
  
  // Listar solicitudes
  export const listarSolicitudes = (url) => async (dispatch) => {
    try {
      const res = await getData(url);
      dispatch({
        type: 'LISTAR_SOLICITUDES_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'LISTAR_SOLICITUDES_FAILURE',
        payload: error.message,
      });
    }
  };
  
  // Agregar comentario
  export const agregarComentario = (url, post) => async (dispatch) => {
    try {
      const res = await postaPI(url, post);
      dispatch({
        type: 'AGREGAR_COMENTARIO_SUCCESS',
        payload: res.data,
      });
      return Promise.resolve(); // Devuelve una promesa resuelta
    } catch (error) {
      dispatch({
        type: 'AGREGAR_COMENTARIO_FAILURE',
        payload: error.message,
      });
      return Promise.reject(); // Devuelve una promesa rechazada si hay un error
    }
  };
  
  // Listar comentarios por servicio
  export const listarComentariosPorServicio = (url, usuarioid) => async (dispatch) => {
    try {
      const res = await getDataAPI(url, usuarioid);
      dispatch({
        type: 'LISTAR_COMENTARIOS_POR_SERVICIO_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'LISTAR_COMENTARIOS_POR_SERVICIO_FAILURE',
        payload: error.message,
      });
    }
  };
  