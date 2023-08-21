import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDatabaseAccessTypes } from 'src/redux/actions/requestsTypeActions';

const DatabaseID = ({ usuarioid, databaseID, fetchDatabaseAccessTypes }) => {
  useEffect(() => {
    fetchDatabaseAccessTypes(usuarioid);
  }, [usuarioid]);

  return (
    <div>
      <h6>Informacion solicitud</h6>
      {databaseID.map((solicitud) => (
        <React.Fragment key={solicitud.bd_id}>
          <p>Dirección: {solicitud.bd_direccion}</p>
          <p>Gerencia: {solicitud.bd_gerencia}</p>
          <p>Jefatura: {solicitud.bd_jefatura}</p>
          <p>Nombre Solicitante: {solicitud.bd_solicitante}</p>
          <p>Justificación: {solicitud.bd_justificacion}</p>
          <p>Servidor: {solicitud.bd_tipoBaseDatos}</p>
          <p>TBase de datos: {solicitud.bd_bd}</p>
          <p>Descripción: {solicitud.bd_descripcion}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  databaseID: state.requestsType.databaseID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDatabaseAccessTypes: (usuarioid) => dispatch(fetchDatabaseAccessTypes(usuarioid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseID);
