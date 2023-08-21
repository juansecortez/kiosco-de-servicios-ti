import { getAPI, postAPI } from '../../utils/FetchData';

export const loginUser = (userLogin) => async (dispatch) => {
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await postAPI('auth/login', userLogin);
    dispatch({ type: 'AUTH', payload: res.data });
    dispatch({ type: 'ALERT', payload: { loading: false } });
    localStorage.setItem('logged', 'true');
    localStorage.setItem('userId', res.data.user.USUARIOID);
    localStorage.setItem('tipo', res.data.user.NIVELFIRMA);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  } catch (error) {
    dispatch({
      type: 'ALERT',
      payload: { errors: error.response.data.message },
    });
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('logged');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    await getAPI('auth/logout');
    window.location.href = '/auth/login';
  } catch (error) {
    dispatch({
      type: 'ALERT',
      payload: { errors: error.response.data.message },
    });
    console.log(error);
  }
};

export const refreshToken = () => async (dispatch) => {
  const logged = localStorage.getItem('logged');
  if (logged !== 'true') return;
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await getAPI('auth/refresh_token');
    dispatch({ type: 'AUTH', payload: res.data });
    dispatch({ type: 'ALERT', payload: { loading: false } });
  } catch (error) {
    dispatch({ type: 'ALERT', payload: { loading: false } });
    localStorage.removeItem('logged');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
    dispatch({
      type: 'ALERT',
      payload: { errors: error.response.data.message },
    });
    console.log(error);
  }
};
