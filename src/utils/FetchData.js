import axios from 'axios';
axios.defaults.withCredentials = true;

export const postAPI = async (url, post, token) => {
  const res = await axios.post(`http://vwebgama:4001/api/v1/${url}`, post, {
    headers: { Authorization: `${token}` },
  });
  return res;
};
export const postaPI = async (url, post) => {
  const res = await axios.post(`http://vwebgama:4001/api/v1/${url}`, post);
  return res;
};


export const getAPI = async (url, token) => {
  const res = await axios.get(`http://vwebgama:4001/api/v1/${url}`, {
    headers: { Authorization: `${token}` },
  });
  return res;
};


export const getData = async (url) => {
  const res = await axios.get(`http://vwebgama:4001/api/v1/${url}`);
  return res;
};

export const getDataAPI = async (url, usuarioid) => {
  const res = await axios.get(`http://vwebgama:4001/api/v1/${url}`, {
    params: { usuarioid },
  });
  return res;
};

export const patchAPI = async (url, post, token) => {
  const res = await axios.patch(`http://vwebgama:4001/api/v1/${url}`, post, {
    headers: { Authorization: `${token}` },
  });
  return res;
};

export const deleteAPI = async (url, token) => {
  const res = await axios.delete(`http://vwebgama:4001/api/v1/${url}`, {
    headers: { Authorization: `${token}` },
  });
  return res;
};

export const putAPI = async (url, data, token) => {
  try {
    const response = await axios.put(`http://vwebgama:4001/api/v1/${url}`, data, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const putaPI = async (url, data, token) => {
  try {
    const response = await axios.put(`http://vwebgama:4001/api/v1/${url}`, data, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
