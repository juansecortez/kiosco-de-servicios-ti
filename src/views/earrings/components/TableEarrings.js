import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  Chip,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { markAsDone } from '../../../redux/actions/requestsActions';
import { fetchReqForEarrings } from 'src/redux/actions/selectsActions';
import { IconEye, IconCheck } from '@tabler/icons';
import ModalIS from 'src/views/dashboard/components/ModalIS';
import Loadable from 'src/layouts/full/shared/loadable/Loadable';

const TableEarrings = ({ earrings, loading, error, fetchReqForEarrings, markAsDone }) => {
  const auth = useSelector((state) => state.auth.user.USUARIOID);
  const [openModal, setOpenModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');

  const openConfirmationModal = (id, action) => {
    setSelectedSolicitud(id);
    setConfirmAction(action);
    setOpenModal(true);
    setConfirmMessage('¿seguro quieres confirmar esta tarea?');
  };
  const openModals = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const closeConfirmationModal = () => {
    setSelectedSolicitud(null);
    setConfirmAction('');
    setOpenModal(false);
  };

  const handleDo = () => {
    if (selectedSolicitud) {
      const user = auth;
      if (confirmAction === 'authorize') {
        markAsDone(selectedSolicitud, user)
          .then(() => fetchReqForEarrings())
          .catch((error) => console.log(error));
      } else {
        closeConfirmationModal();
      }
    }
    closeConfirmationModal();
  };

  const handleDoRequest = (id, user) => {
    openConfirmationModal(id, 'authorize');
  };
  useEffect(() => {
    fetchReqForEarrings();
  }, []);

  // Ordenar los datos por fecha de forma descendente (último dato creado primero)
  const datosOrdenados = [...earrings].sort((a, b) => {
    const fechaA = new Date(a.sol_fechaSolicitud);
    const fechaB = new Date(b.sol_fechaSolicitud);
    return fechaB - fechaA;
  });

  if (loading) {
    return <Loadable />;
  }

  if (error) {
    console.log(`Error al cargar las solicitudes : ${error}`);
    return <Loadable />;
  }

  if (!earrings || earrings.length === 0) {
    return (
      <Typography variant="subtitle1" fontWeight={600} align="center">
        No tienes pendientes por finalizar.
      </Typography>
    );
  }

  return (
    <>
      <TableContainer sx={{ overflow: 'auto', maxHeight: '600px' }}>
        <Table>
          <TableHead
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              bgcolor: 'peco.main',
            }}
          >
            <TableRow>
              <TableCell sx={{ color: 'text.sidebar' }}>Usuario Solicitante</TableCell>
              <TableCell sx={{ color: 'text.sidebar' }}>Tipo de Solicitud</TableCell>
              <TableCell sx={{ color: 'text.sidebar' }}>Fecha de Solicitud</TableCell>
              <TableCell sx={{ color: 'text.sidebar', textAlign: 'center' }}>Estatus</TableCell>
              <TableCell sx={{ color: 'text.sidebar', textAlign: 'center' }}>Detalles</TableCell>
              <TableCell sx={{ color: 'text.sidebar', textAlign: 'center' }}>Hacer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosOrdenados.map((solicitud) => (
              <TableRow key={solicitud.sol_id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {solicitud.sol_usuarioidSolicitante}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {solicitud.tipo_nombreSolicitud}
                  </Typography>
                </TableCell>
                <TableCell>
                  {new Date(solicitud.sol_fechaSolicitud).toISOString().split('T')[0]}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip
                    sx={{
                      px: '4px',
                      backgroundColor:
                        solicitud.sol_estatusSolicitud === null
                          ? 'blue'
                          : solicitud.sol_estatusSolicitud === 1
                          ? 'green'
                          : solicitud.sol_estatusSolicitud === 2
                          ? 'red'
                          : 'gray', // Color por defecto para otros estados desconocidos
                      color: '#fff',
                    }}
                    size="small"
                    label={
                      solicitud.sol_estatusSolicitud === null
                        ? 'En proceso'
                        : solicitud.sol_estatusSolicitud === 1
                        ? 'Aceptado'
                        : solicitud.sol_estatusSolicitud === 2
                        ? 'Rechazado'
                        : 'Desconocido' // Etiqueta por defecto para otros estados desconocidos
                    }
                  ></Chip>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Tooltip
                    sx={{ zIndex: 20, position: 'unset' }}
                    title="Ver"
                    onClick={() => openModals(solicitud)}
                  >
                    <Fab size="small">
                      <IconEye />
                    </Fab>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Tooltip
                    sx={{ zIndex: 20, position: 'unset' }}
                    title="Autorizar"
                    onClick={() => handleDoRequest(solicitud.sol_id, auth)}
                  >
                    <Fab size="small" color="buttonSuccess">
                      <IconCheck />
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showModal && <ModalIS solicitud={selectedSolicitud} closeModal={closeModal} />}
      </TableContainer>
      <Dialog open={openModal} onClose={closeConfirmationModal}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <p>{confirmMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDo}>Confirmar</Button>
          <Button onClick={closeConfirmationModal}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToPropsMade = (state) => {
  return {
    earrings: state.selects.earrings,
    loading: state.selects.loading,
    error: state.selects.error,
  };
};

export default connect(mapStateToPropsMade, { fetchReqForEarrings, markAsDone })(TableEarrings);
