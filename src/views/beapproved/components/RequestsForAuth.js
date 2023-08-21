import React, { useEffect, useState } from 'react';
import {
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { IconEye } from '@tabler/icons';
import ModalIS from '../../dashboard/components/ModalIS';

import { IconCheck, IconX } from '@tabler/icons';
import { connect, useSelector } from 'react-redux';
import DashboardCard from 'src/components/shared/DashboardCard';
import {
  fetchReqForAuth,
  authorizeRequest,
  rejectRequest,
} from '../../../redux/actions/requestsActions';
import Loadable from 'src/layouts/full/shared/loadable/Loadable';

const RequestsForAuth = ({
  solicitud,
  loading,
  error,
  fetchReqForAuth,
  authorizeRequest,
  rejectRequest,
}) => {
  const auth = useSelector((state) => state.auth.user.USUARIOID);
  const [showModal, setShowModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  useEffect(() => {
    fetchReqForAuth(auth);
  }, [fetchReqForAuth, auth]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');

  const openConfirmationModal = (id, action) => {
    setSelectedRequestId(id);
    setConfirmAction(action);
    setOpenModal(true);
    setConfirmMessage(
      action === 'authorize'
        ? '¿Estás seguro de que quieres Autorizar la solicitud?'
        : '¿Estás seguro de que quieres Rechazar la solicitud?',
    );
  };

  const openModals = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeConfirmationModal = () => {
    setSelectedRequestId(null);
    setConfirmAction('');
    setOpenModal(false);
  };

  const handleConfirmAction = () => {
    if (selectedRequestId) {
      const user = auth;
      if (confirmAction === 'authorize') {
        authorizeRequest(selectedRequestId, user)
          .then(() => fetchReqForAuth(auth))
          .catch((error) => console.log(error));
      } else if (confirmAction === 'reject') {
        rejectRequest(selectedRequestId, user)
          .then(() => fetchReqForAuth(auth))
          .catch((error) => console.log(error));
      }
    }
    closeConfirmationModal();
  };

  const handleAuthorizeRequest = (id, user) => {
    openConfirmationModal(id, 'authorize');
  };

  const handleRejectRequest = (id, user) => {
    openConfirmationModal(id, 'reject');
  };

  if (loading) {
    return <Loadable />;
  }

  if (error) {
    console.log(`Error al cargar las solicitud por Autorizar: ${error}`);
  }

  if (!solicitud || solicitud.length === 0) {
    return (
      <Typography variant="subtitle1" fontWeight={600} align='center'>
        No tienes pendientes por aprovar.
      </Typography>
    );
  }

  return (
    <DashboardCard title="Solicitud por Autorizar">
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
              <TableCell sx={{ color: 'text.sidebar' }}>Fecha de Solicitud</TableCell>
              <TableCell sx={{ color: 'text.sidebar' }}>Tipo de Solicitud</TableCell>
              <TableCell sx={{ color: 'text.sidebar', textAlign: 'center' }}>Detalles</TableCell>
              <TableCell sx={{ color: 'text.sidebar', textAlign: 'center' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitud.map((data) => (
              <TableRow key={data.sol_id}>
                <TableCell>{data.sol_usuarioidSolicitante}</TableCell>
                <TableCell>
                  {data.sol_fechaSolicitud
                    ? new Date(data.sol_fechaSolicitud).toISOString().split('T')[0]
                    : ''}
                </TableCell>
                <TableCell>{data.tipo_nombreSolicitud}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Tooltip
                    sx={{ zIndex: 20, position: 'unset' }}
                    title="Ver"
                    onClick={() => openModals(data)}
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
                    onClick={() => handleAuthorizeRequest(data.sol_id, auth)}
                  >
                    <Fab size="small" color="buttonSuccess">
                      <IconCheck />
                    </Fab>
                  </Tooltip>

                  <Tooltip
                    sx={{ zIndex: 20, position: 'unset', marginLeft: '8px' }}
                    title="Rechazar"
                    onClick={() => handleRejectRequest(data.sol_id, auth)}
                  >
                    <Fab size="small" color="buttonDanger">
                      <IconX />
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
          <Button onClick={handleConfirmAction}>Confirmar</Button>
          <Button onClick={closeConfirmationModal}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </DashboardCard>
  );
};

const mapStateToPropsAuth = (state) => {
  return {
    solicitud: state.reqForAuth.solicitud,
    loading: state.reqForAuth.loading,
    error: state.reqForAuth.error,
  };
};

export default connect(mapStateToPropsAuth, { fetchReqForAuth, authorizeRequest, rejectRequest })(
  RequestsForAuth,
);
