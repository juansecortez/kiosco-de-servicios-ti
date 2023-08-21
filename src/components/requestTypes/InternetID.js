import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchInternetAccessTypes } from 'src/redux/actions/requestsTypeActions';

const InternetID = ({ usuarioid, internetID, fetchInternetAccessTypes }) => {
  useEffect(() => {
    fetchInternetAccessTypes(usuarioid);
  }, [usuarioid]);

  return (
    <div>
      <h6>Informacion solicitud</h6>
      {internetID.map((solicitud) => (
        <React.Fragment key={solicitud.int_id}>
          <p>Dirección: {solicitud.int_direccion}</p>
          <p>Gerencia: {solicitud.int_gerencia}</p>
          <p>Jefatura: {solicitud.int_jefatura}</p>
          <p>Nombre Solicitante: {solicitud.int_solicitante}</p>
          <p>Justificación: {solicitud.int_justificacion}</p>
          <p>Tipo de Internet: {solicitud.int_tipoInternet}</p>
          <p>Descripción: {solicitud.int_descripcion}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  internetID: state.requestsType.internetID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInternetAccessTypes: (usuarioid) => dispatch(fetchInternetAccessTypes(usuarioid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InternetID);
