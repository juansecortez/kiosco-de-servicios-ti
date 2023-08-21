import { getDataAPI } from '../../utils/FetchData';

// Accion para obtener los tipos de solicitudes de altas de usuarios
export const fetchUserRegistrationTypes = (usuarioid) => {
  return async (dispatch) => {
    try {
      const response = await getDataAPI(`selects/userRegistrationID`, usuarioid);
      dispatch({ type: 'FETCH_USER_REGISTRATION_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_REGISTRATION_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los tipos de solicitudes de acceso a sistemas
export const fetchSystemAccessTypes = (usuarioid) => {
  return async (dispatch) => {
    try {
      const response = await getDataAPI(`selects/systemsID`, usuarioid);
      dispatch({ type: 'FETCH_SYSTEM_ACCESS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_SYSTEM_ACCESS_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los tipos de solicitudes de acceso a recurso informatico
export const fetchResourceAccessTypes = (usuarioid) => {
  return async (dispatch) => {
    try {
      const response = await getDataAPI(`selects/resourceID`, usuarioid);
      dispatch({ type: 'FETCH_RESOURCE_ACCESS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_RESOURCE_ACCESS_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los tipos de solicitudes de acceso a carpetas
export const fetchFolderAccessTypes = (usuarioid) => {
  return async (dispatch) => {
    try {
      const response = await getDataAPI(`selects/folderID`, usuarioid);
      dispatch({ type: 'FETCH_FOLDER_ACCESS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_FOLDER_ACCESS_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los tipos de solicitudes de acceso a base de datos
export const fetchDatabaseAccessTypes = (usuarioid) => {
  return async (dispatch) => {
    try {
      const response = await getDataAPI(`selects/databaseID`, usuarioid);
      dispatch({ type: 'FETCH_DATABASE_ACCESS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_DATABASE_ACCESS_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los tipos de solicitudes de acceso a internet
export const fetchInternetAccessTypes = (usuarioid) => {
  return async (dispatch) => {
    try {
      const response = await getDataAPI(`selects/internetID`, usuarioid);
      dispatch({ type: 'FETCH_INTERNET_ACCESS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_INTERNET_ACCESS_FAILURE', payload: error.message });
    }
  };
};
