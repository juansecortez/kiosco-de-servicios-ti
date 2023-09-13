import { getData, postaPI, putaPI, deleteAPI } from '../../utils/FetchData';

// Acción para obtener todos los issues
export const fetchIssues = () => {
  return async (dispatch) => {
    try {
      const res = await getData('issues/getAllIssues');
      dispatch({ type: 'FETCH_ISSUES_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ISSUES_FAILURE', payload: error.message });
    }
  };
};
export const fetchIssuesByType = (tipo) => {
    return async (dispatch) => {
      try {
        const res = await getData(`issues/issues/${tipo}`);
        dispatch({ type: 'FETCH_ISSUES_BY_TYPE_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ISSUES_BY_TYPE_FAILURE', payload: error.message });
      }
    };
  };
  
// Acción para agregar un issue
export const addIssue = (data) => async (dispatch) => {
  try {
    const res = await postaPI('issues/addIssue', data);
    dispatch({ type: 'ADD_ISSUE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'ADD_ISSUE_FAILURE', payload: error.message });
  }
};

// Acción para editar un issue
export const editIssue = (id, data) => async (dispatch) => {
  try {
    const res = await putaPI(`issues/editIssue/${id}`, data);
    dispatch({ type: 'EDIT_ISSUE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'EDIT_ISSUE_FAILURE', payload: error.message });
  }
};

// Acción para eliminar un issue
export const deleteIssue = (id) => async (dispatch) => {
  try {
    const res = await deleteAPI(`issues/deleteIssue/${id}`);
    dispatch({ type: 'DELETE_ISSUE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'DELETE_ISSUE_FAILURE', payload: error.message });
  }
};
