import React from 'react';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import Toast from './Toast';

export const Alert = () => {
  const { alert } = useSelector((state) => state);
  return (
    <>
      {alert.loading && <Loading />}
      {alert.errors && <Toast title="Errores" body={alert.errors} bgColor="bg-danger" />}
      {alert.success && <Toast title="Success" body={alert.success} bgColor="bg-success" />}
    </>
  );
};

export const showErrMsg = (msg) => {
  return <div className="errMsg">{msg}</div>;
};

export const showSuccessMsg = (msg) => {
  return <div className="successMsg">{msg}</div>;
};
