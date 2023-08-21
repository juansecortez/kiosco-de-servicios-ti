import { getDataAPI, putAPI } from '../../utils/FetchData';

// Acción para obtener las solicitudes pendientes de autorización
export const fetchReqForAuth = (user) => async (dispatch) => {
  try {
    const res = await getDataAPI('queries/requestsApproved', user);
    dispatch({ type: 'FETCH_SOLICITUD_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_SOLICITUD_FAILURE', payload: error.message });
  }
};

// Acción para obtener las solicitudes realizadas por un usuario
export const fetchReqMade = (user) => async (dispatch) => {
  try {
    const res = await getDataAPI('queries/requestsMadeByID', user);
    dispatch({ type: 'FETCH_SOLICITUDES_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_SOLICITUDES_FAILURE', payload: error.message });
  }
};

// Acción para autorizar una solicitud
export const authorizeRequest = (requestId, authorizedBy) => async (dispatch) => {
  try {
    const res = await putAPI(`request/authorize/${requestId}/${authorizedBy}`);
    // Manejar la respuesta del servidor según sea necesario
    dispatch({ type: 'AUTHORIZE_REQUEST_SUCCESS', payload: res.data });
  } catch (error) {
    // Manejar errores de solicitud
    dispatch({ type: 'AUTHORIZE_REQUEST_FAILURE', payload: error.message });
  }
};
// Acción para rechazar una solicitud
export const rejectRequest = (requestId, rejectedBy) => async (dispatch) => {
  try {
    const res = await putAPI(`request/reject/${requestId}/${rejectedBy}`);
    // Manejar la respuesta del servidor según sea necesario
    dispatch({ type: 'REJECT_REQUEST_SUCCESS', payload: res.data });
  } catch (error) {
    // Manejar errores de solicitud
    dispatch({ type: 'REJECT_REQUEST_FAILURE', payload: error.message });
  }
};
// Acción para hacer la tarea
export const markAsDone = (idtask, doneBy) => async (dispatch) => {
  try {
    const res = await putAPI(`request/markAsDone/${idtask}/${doneBy}`);
    // Manejar la respuesta del servidor según sea necesario
    dispatch({ type: 'DONE_REQUEST_SUCCESS', payload: res.data });
  } catch (error) {
    // Manejar errores de solicitud
    dispatch({ type: 'DONE_REQUEST_FAILURE', payload: error.message });
  }
};
