import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserRegistrationTypes } from 'src/redux/actions/requestsTypeActions';

const UserRegistrationID = ({ usuarioid, userRegistration, fetchUserRegistrationTypes }) => {
  useEffect(() => {
    fetchUserRegistrationTypes(usuarioid);
  }, [usuarioid]);

  return (
    <div>
      <h6>Informacion solicitud</h6>
      {userRegistration.map((solicitud) => (
        <React.Fragment key={solicitud.altas_id}>
          <p>Nombre Colaborador: {solicitud.altas_nombreColaborador}</p>
          <p>Dirección: {solicitud.altas_direccion}</p>
          <p>Gerencia: {solicitud.altas_gerencia}</p>
          <p>Jefatura: {solicitud.altas_jefatura}</p>
          <p>
            Fecha de inicio: {new Date(solicitud.altas_fechaInicio).toISOString().split('T')[0]}
          </p>
          <p>Fecha de fin: {new Date(solicitud.altas_fechaFin).toISOString().split('T')[0]}</p>
          <p>Necesita Correo: {solicitud.altas_necesitaCorreo === 1 ? 'Si' : 'No'}</p>
          <p>Necesita Computadora: {solicitud.altas_necesitaComputadora === 1 ? 'Si' : 'No'}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userRegistration: state.requestsType.userRegistration,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserRegistrationTypes: (usuarioid) => dispatch(fetchUserRegistrationTypes(usuarioid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistrationID);
