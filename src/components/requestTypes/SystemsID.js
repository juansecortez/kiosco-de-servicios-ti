import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSystemAccessTypes } from 'src/redux/actions/requestsTypeActions';

const SystemsID = ({ usuarioid, systemsID, fetchSystemAccessTypes }) => {
  useEffect(() => {
    fetchSystemAccessTypes(usuarioid);
  }, [usuarioid]);

  if (!systemsID) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h6>Informacion solicitud</h6>
      {systemsID.map((solicitud) => (
        <React.Fragment key={solicitud.sis_id}>
          <p>Dirección: {solicitud.sis_direccion}</p>
          <p>Gerencia: {solicitud.sis_gerencia}</p>
          <p>Jefatura: {solicitud.sis_jefatura}</p>
          <p>Nombre sistema: {solicitud.sis_nombreSistema}</p>
          <p>Funcion a desarrollar: {solicitud.sis_funcionDesarrollar}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  systemsID: state.requestsType.systemID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSystemAccessTypes: (usuarioid) => dispatch(fetchSystemAccessTypes(usuarioid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SystemsID);
