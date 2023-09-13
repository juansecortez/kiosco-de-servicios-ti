import {
    postaPI,
    getData,
    getDataAPI,
    putaPI,
    uploadFileAPI
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

  //hola
  
  // Listar solicitudes por ID de usuario
export const listarSolicitudesId = (url) => async (dispatch) => {
  try {
      const res = await getData(url);
      dispatch({
          type: 'LISTAR_SOLICITUDES_ID_SUCCESS',
          payload: res.data,
      });
  } catch (error) {
      dispatch({
          type: 'LISTAR_SOLICITUDES_ID_FAILURE',
          payload: error.message,
      });
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
      return Promise.resolve(res.data); // Devuelve los datos
    } catch (error) {
      dispatch({
        type: 'CREAR_SOLICITUD_FAILURE',
        payload: error.message,
      });
      return Promise.reject(error.message); // Devuelve el mensaje de error
    }
  };
  export const agregarComentario = (url, post) => async (dispatch) => {
    // Iniciar el loading antes de hacer la solicitud.
    dispatch({ type: 'ALERT', payload: { loading: true } });
  
    try {
      const res = await postaPI(url, post);
      
      // Ocultar el loading después de recibir respuesta.
      dispatch({ type: 'ALERT', payload: { loading: false } });
  
      dispatch({
        type: 'AGREGAR_COMENTARIO_SUCCESS',
        payload: res.data,
      });
      return Promise.resolve(res.data); // Devuelve los datos
    } catch (error) {
      // Ocultar el loading en caso de error.
      dispatch({ type: 'ALERT', payload: { loading: false } });
  
      dispatch({
        type: 'AGREGAR_COMENTARIO_FAILURE',
        payload: error.message,
      });
      return Promise.reject(error.message); // Devuelve el mensaje de error
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
  

  
  
  // Listar comentarios por servicio
  export const listarComentariosPorServicio = (url, usuarioid) => async (dispatch) => {
    // Iniciar el loading antes de hacer la solicitud.
    dispatch({ type: 'ALERT', payload: { loading: true } });
  
    try {
      const res = await getDataAPI(url, usuarioid);
      
      // Ocultar el loading después de recibir respuesta.
      dispatch({ type: 'ALERT', payload: { loading: false } });
  
      dispatch({
        type: 'LISTAR_COMENTARIOS_POR_SERVICIO_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      // Ocultar el loading en caso de error.
      dispatch({ type: 'ALERT', payload: { loading: false } });
  
      dispatch({
        type: 'LISTAR_COMENTARIOS_POR_SERVICIO_FAILURE',
        payload: error.message,
      });
    }
  };
  
  // Agregar imagen
 
  export const agregarImagen = (url, file, ID_Servicio, ID_Comentario, ID_Externo) => async (dispatch) => {
    // Iniciar el loading antes de hacer la solicitud.
    dispatch({ type: 'ALERT', payload: { loading: true } });
  
    try {
      const res = await uploadFileAPI(url, file, ID_Servicio, ID_Comentario, ID_Externo);
      
      // Ocultar el loading después de recibir respuesta.
      dispatch({ type: 'ALERT', payload: { loading: false } });
  
      dispatch({
        type: 'AGREGAR_IMAGEN_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      // Ocultar el loading en caso de error.
      dispatch({ type: 'ALERT', payload: { loading: false } });
  
      dispatch({
        type: 'AGREGAR_IMAGEN_FAILURE',
        payload: error.message,
      });
    }
  };
  
  
// Obtener imagen
export const obtenerImagen = (url) => async (dispatch) => {
  try {
    const res = await getData(url);

    // Si es un arreglo, entonces hay múltiples imágenes
    if (Array.isArray(res.data)) {
      dispatch({
        type: 'OBTENER_IMAGENES_SUCCESS',  // Nota el cambio en el type
        payload: res.data,
      });
    } 
    // Si es un objeto, entonces es solo una imagen
    else if (typeof res.data === 'object') {
      dispatch({
        type: 'OBTENER_IMAGEN_SUCCESS',
        payload: res.data,
      });
    } else {
      throw new Error('El formato de los datos no es válido');
    }

  } catch (error) {
    dispatch({
      type: 'OBTENER_IMAGEN_FAILURE',
      payload: error.message,
    });
  }
};


  