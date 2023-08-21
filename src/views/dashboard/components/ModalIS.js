import React from 'react';
import { Box, Modal, Button, Tab } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// Componentes para cada tipo de solicitud
import UserRegistrationID from 'src/components/requestTypes/UserRegistrationID';
import SystemsID from 'src/components/requestTypes/SystemsID';
import ResourceID from 'src/components/requestTypes/ResourceID';
import FolderID from 'src/components/requestTypes/FolderID';
import DatabaseID from 'src/components/requestTypes/DatabaseID';
import InternetID from 'src/components/requestTypes/InternetID';

function ModalIS({ solicitud, closeModal }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!solicitud) {
    return null;
  }

  // Función para renderizar el componente correspondiente según el tipo de solicitud
  const renderTipoSolicitudComponent = () => {
    // Determina el tipo de solicitud
    const tipoSolicitud = solicitud.sol_idTipo;
    const requestID = solicitud.sol_id;

    // Renderiza el componente correspondiente según el tipo de solicitud
    switch (tipoSolicitud) {
      case 1:
        return <UserRegistrationID usuarioid={requestID} />;
      case 2:
        return <SystemsID usuarioid={requestID} />;
      case 3:
        return <ResourceID usuarioid={requestID} />;
      case 4:
        return <FolderID usuarioid={requestID} />;
      case 5:
        return <DatabaseID usuarioid={requestID} />;
      case 6:
        return <InternetID usuarioid={requestID} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'background.paper',
        }}
      >
        <DashboardCard>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Descripción" value="1" />
                  <Tab label="Autorización" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <p>Tipo de solicitud: {solicitud.tipo_nombreSolicitud}</p>
                <p>Usuario Solicitante: {solicitud.sol_usuarioidSolicitante}</p>
                <p>
                  Estatus de solicitud:{' '}
                  {solicitud.sol_estatusSolicitud === null
                    ? 'En proceso'
                    : solicitud.sol_estatusSolicitud === 1
                    ? 'Aceptado'
                    : 'Rechazado'}
                </p>
                <p>
                  Fecha de solicitud:{' '}
                  {solicitud.sol_fechaSolicitud &&
                    new Date(solicitud.sol_fechaSolicitud).toISOString().split('T')[0]}
                </p>
                <hr />
                {/* Renderiza el componente correspondiente según el tipo de solicitud */}
                {renderTipoSolicitudComponent()}
              </TabPanel>
              <TabPanel value="2">
                <TabPanel value="2">
                  <h6>Flujo de autorización</h6>
                  {solicitud.sol_autorizaNivel && (
                    <p>
                      <strong>{solicitud.sol_autorizaNivelNombre} </strong>
                      <strong>- Jefe</strong>
                      <br />
                      {solicitud.sol_autorizacionNivel === null
                        ? 'Sin autorizar'
                        : solicitud.sol_autorizacionNivel === 0
                        ? 'Rechazada'
                        : 'Autorizada'}
                      <br />
                      {solicitud.sol_fechaAutorizacionNivel &&
                        new Date(solicitud.sol_fechaAutorizacionNivel).toISOString().split('T')[0]}
                    </p>
                  )}
                  {solicitud.sol_jefeInfraestructura && (
                    <p>
                      <strong>{solicitud.sol_jefeInfraNombre} </strong>
                      <strong>- Jefe de infraestructura</strong>
                      <br />
                      {solicitud.sol_autorizacionJefeInfra === null
                        ? 'Sin autorizar'
                        : solicitud.sol_autorizacionJefeInfra === 0
                        ? 'Rechazada'
                        : 'Autorizada'}
                      <br />
                      {solicitud.sol_fechaAutorizacionJefeInfra &&
                        new Date(solicitud.sol_fechaAutorizacionJefeInfra)
                          .toISOString()
                          .split('T')[0]}
                    </p>
                  )}
                  {solicitud.sol_jefeDesarrollo && (
                    <p>
                      <strong>{solicitud.sol_jefeDesarrolloNombre} </strong>
                      <strong>- Jefe de TI</strong>
                      <br />
                      {solicitud.sol_autorizacionJefeDesarrollo === null
                        ? 'Sin autorizar'
                        : solicitud.sol_autorizacionJefeDesarrollo === 0
                        ? 'Rechazada'
                        : 'Autorizada'}
                      <br />
                      {solicitud.sol_fechaAutorizacionJefeDesarrollo &&
                        new Date(solicitud.sol_fechaAutorizacionJefeDesarrollo)
                          .toISOString()
                          .split('T')[0]}
                    </p>
                  )}
                  {solicitud.sol_jefeSeguridad && (
                    <p>
                      <strong>{solicitud.sol_jefeSeguridadNombre} </strong>
                      <strong>- Jefe de Seguridad</strong>
                      <br />
                      {solicitud.sol_autorizacionJefeSeguridad === null
                        ? 'Sin autorizar'
                        : solicitud.sol_autorizacionJefeSeguridad === 0
                        ? 'Rechazada'
                        : 'Autorizada'}
                      <br />
                      {solicitud.sol_fechaAutorizacionJefeSeguridad &&
                        new Date(solicitud.sol_fechaAutorizacionJefeSeguridad)
                          .toISOString()
                          .split('T')[0]}
                    </p>
                  )}
                  {solicitud.sol_gerenciaTI && (
                    <p>
                      <strong>{solicitud.sol_gerenciaTINombre} </strong>
                      <strong>- Gerente TI</strong>
                      <br />
                      {solicitud.sol_autorizacionGerenciaTI === null
                        ? 'Sin autorizar'
                        : solicitud.sol_autorizacionGerenciaTI === 0
                        ? 'Rechazada'
                        : 'Autorizada'}
                      <br />
                      {solicitud.sol_fechaAutorizacionGerenciaTI &&
                        new Date(solicitud.sol_fechaAutorizacionGerenciaTI)
                          .toISOString()
                          .split('T')[0]}
                    </p>
                  )}
                  {solicitud.sol_direccionFinanzas && (
                    <p>
                      <strong>{solicitud.sol_dirFinanzasNombre} </strong>
                      <strong>- Director de finanzas</strong>
                      <br />
                      {solicitud.sol_autorizacionDirFinanzas === null
                        ? 'Sin autorizar'
                        : solicitud.sol_autorizacionDirFinanzas === 0
                        ? 'Rechazada'
                        : 'Autorizada'}
                      <br />
                      {solicitud.sol_fechaAutorizacionDirFinanzas &&
                        new Date(solicitud.sol_fechaAutorizacionDirFinanzas)
                          .toISOString()
                          .split('T')[0]}
                    </p>
                  )}
                  {solicitud.sol_direccionGeneral && (
                    <p>
                      <strong>{solicitud.sol_dirGeneralNombre} </strong>
                      <strong>- Direcctor general</strong>
                      <br />
                      {solicitud.sol_autorizacionDirGeneral === null
                        ? 'Sin autorizar'
                        : solicitud.sol_autorizacionDirGeneral === 0
                        ? 'Rechazada'
                        : 'Autorizada'}
                      <br />
                      {solicitud.sol_fechaAutorizacionDirGeneral &&
                        new Date(solicitud.sol_fechaAutorizacionDirGeneral)
                          .toISOString()
                          .split('T')[0]}
                    </p>
                  )}
                </TabPanel>
              </TabPanel>
            </TabContext>
          </Box>
          <Button variant="contained" color="buttonDanger" onClick={closeModal}>
            Cerrar
          </Button>
        </DashboardCard>
      </Box>
    </Modal>
  );
}

export default ModalIS;
