import jwtDecode from 'jwt-decode';
import { getAPI } from './FetchData';

export const checkTokenExp = async (token, dispatch) => {
  const decoded = jwtDecode(token);
  if (decoded.exp >= Date.now() / 1000) return;
  try {
    const res = await getAPI('auth/refresh_token');
    dispatch({
      type: 'AUTH',
      payload: res.data,
    });
    return res.data.access_token;
  } catch (error) {
    localStorage.removeItem('logged');
    localStorage.removeItem('userId');
    dispatch({
      type: 'AUTH',
      payload: {},
    });
  }
};
