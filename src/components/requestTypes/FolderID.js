import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFolderAccessTypes } from 'src/redux/actions/requestsTypeActions';

const FolderID = ({ usuarioid, folderID, fetchFolderAccessTypes }) => {
  useEffect(() => {
    fetchFolderAccessTypes(usuarioid);
  }, [usuarioid]);

  return (
    <div>
      <h6>Informacion solicitud</h6>
      {folderID.map((solicitud) => (
        <React.Fragment key={solicitud.carp_id}>
          <p>Dirección: {solicitud.carp_direccion}</p>
          <p>Gerencia: {solicitud.carp_gerencia}</p>
          <p>Jefatura: {solicitud.carp_jefatura}</p>
          <p>Nombre Solicitante: {solicitud.carp_solicitante}</p>
          <p>Justificación: {solicitud.carp_justificacion}</p>
          <p>Tipo de carpeta: {solicitud.carp_tipoCarpeta}</p>
          <p>Descripción: {solicitud.carp_descripcion}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  folderID: state.requestsType.folderID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFolderAccessTypes: (usuarioid) => dispatch(fetchFolderAccessTypes(usuarioid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderID);
