import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchResourceAccessTypes } from 'src/redux/actions/requestsTypeActions';

const ResourceID = ({ usuarioid, resourceID, fetchResourceAccessTypes }) => {
  useEffect(() => {
    fetchResourceAccessTypes(usuarioid);
  }, [usuarioid]);

  return (
    <div>
      <h6>Informacion solicitud</h6>
      {resourceID.map((solicitud) => (
        <React.Fragment key={solicitud.recu_id}>
          <p>Dirección: {solicitud.recu_direccion}</p>
          <p>Gerencia: {solicitud.recu_gerencia}</p>
          <p>Jefatura: {solicitud.recu_jefatura}</p>
          <p>Nombre Solicitante: {solicitud.recu_solicitante}</p>
          <p>Justificación: {solicitud.recu_justificacion}</p>
          <p>Tipo de recurso informatico: {solicitud.recu_tipoRecursoInfo}</p>
          <p>Recurso informatico: {solicitud.recu_recu}</p>
          <p>Cantidad: {solicitud.recu_cantidad}</p>
          <p>Descripción: {solicitud.recu_descripcion}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  resourceID: state.requestsType.resourceID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchResourceAccessTypes: (usuarioid) => dispatch(fetchResourceAccessTypes(usuarioid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceID);
