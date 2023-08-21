import { getData } from '../../utils/FetchData';

// Acción para obtener las direcciones
export const fetchDirections = () => {
  return async (dispatch) => {
    try {
      const response = await getData('selects/directions');
      dispatch({ type: 'FETCH_DIRECTIONS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_DIRECTIONS_FAILURE', payload: error.message });
    }
  };
};
export const fetchSubResources = (tipo_id) => {
  return async (dispatch) => {
    try {
      const response = await getData(`selects/getRecursos/${tipo_id}`);
      dispatch({ type: 'FETCH_RECURSOS_BY_TYPE_SUCCESS', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'FETCH_RECURSOS_BY_TYPE_FAILURE', payload: error.message });
      throw error;
    }
  };
};
export const fetchDataBases = (cadena) => {
  return async (dispatch) => {
    try {
      const response = await getData(`selects/execute/${cadena}`);
      dispatch({ type: 'FETCH_RECURSOS_BY_TYPE_SUCCESS', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'FETCH_RECURSOS_BY_TYPE_FAILURE', payload: error.message });
      throw error;
    }
  };
};
// Acción para obtener las gerencias
export const fetchManagement = () => {
  return async (dispatch) => {
    try {
      const response = await getData('selects/management');
      dispatch({ type: 'FETCH_MANAGEMENT_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_MANAGEMENT_FAILURE', payload: error.message });
    }
  };
};

// Acción para obtener las jefaturas
export const fetchLeadership = () => {
  return async (dispatch) => {
    try {
      const response = await getData('selects/leadership');
      dispatch({ type: 'FETCH_LEADERSHIP_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_LEADERSHIP_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los sistemas de información
export const fetchInformationSystems = () => {
  return async (dispatch) => {
    try {
      const response = await getData('selects/systems');
      dispatch({ type: 'FETCH_INFORMATION_SYSTEMS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_INFORMATION_SYSTEMS_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los tipos de recursos informáticos
export const fetchComputerResources = () => {
  return async (dispatch) => {
    try {
      const response = await getData('selects/resource');
      dispatch({ type: 'FETCH_COMPUTER_RESOURCES_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_COMPUTER_RESOURCES_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los tipos de carpetas
export const fetchFolderTypes = () => {
  return async (dispatch) => {
    try {
      const response = await getData('selects/folder');
      dispatch({ type: 'FETCH_FOLDERS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_FOLDERS_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los tipos de bases de datos
export const fetchDatabaseTypes = () => {
  return async (dispatch) => {
    try {
      const response = await getData('selects/database');
      dispatch({ type: 'FETCH_DATABASES_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_DATABASES_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener los tipos de internet
export const fetchInternetTypes = () => {
  return async (dispatch) => {
    try {
      const response = await getData('selects/internet');
      dispatch({ type: 'FETCH_INTERNET_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_INTERNET_FAILURE', payload: error.message });
    }
  };
};

// Accion para obtener las solicitudes autorizadas
export const fetchReqForEarrings = () => {
  return async (dispatch) => {
    try {
      const response = await getData('selects/earrings');
      dispatch({ type: 'FETCH_EARRINGS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_EARRINGS_FAILURE', payload: error.message });
    }
  };
};
