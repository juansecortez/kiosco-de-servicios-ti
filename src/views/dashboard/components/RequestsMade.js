import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
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
  Typography,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { fetchReqMade } from '../../../redux/actions/requestsActions';
import { IconEye } from '@tabler/icons';
import ModalIS from './ModalIS';
import Loadable from 'src/layouts/full/shared/loadable/Loadable';

const RequestsMade = ({ solicitudes, loading, error, fetchReqMade }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  const auth = useSelector((state) => state.auth.user.USUARIOID);

  const openModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchReqMade(auth);
  }, []);

  // Ordenar los datos por fecha de forma descendente (último dato creado primero)
  const datosOrdenados = [...solicitudes].sort((a, b) => {
    const fechaA = new Date(a.sol_fechaSolicitud);
    const fechaB = new Date(b.sol_fechaSolicitud);
    return fechaB - fechaA;
  });

  if (loading) {
    return <Loadable />;
  }

  if (error) {
    console.log(`Error al cargar las solicitudes realizadas: ${error}`);
    return null;
  }

  if (!solicitudes || solicitudes.length === 0) {
    return (
      <Typography variant="subtitle1" fontWeight={600} align='center'>
        No Ha hecho ninguna solicitud.
      </Typography>
    );
  }

  return (
    <DashboardCard title="Solicitudes realizadas">
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
              <TableCell sx={{ color: 'text.sidebar' }}>Tipo</TableCell>
              <TableCell sx={{ color: 'text.sidebar' }}>Fecha</TableCell>
              <TableCell sx={{ color: 'text.sidebar', textAlign: 'center' }}>Estatus</TableCell>
              <TableCell sx={{ color: 'text.sidebar', textAlign: 'center' }}>Detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosOrdenados.map((solicitud) => (
              <TableRow key={solicitud.sol_id}>
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
                          : 'red',
                      color: '#fff',
                    }}
                    size="small"
                    label={
                      solicitud.sol_estatusSolicitud === null
                        ? 'En proceso'
                        : solicitud.sol_estatusSolicitud === 1
                        ? 'Aceptado'
                        : 'Rechazado'
                    }
                  ></Chip>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Tooltip
                    sx={{ zIndex: 20, position: 'unset' }}
                    title="Ver"
                    onClick={() => openModal(solicitud)}
                  >
                    <Fab size="small">
                      <IconEye />
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showModal && <ModalIS solicitud={selectedSolicitud} closeModal={closeModal} />}
      </TableContainer>
    </DashboardCard>
  );
};

const mapStateToPropsMade = (state) => {
  return {
    solicitudes: state.reqMade.solicitudes,
    loading: state.reqMade.loading,
    error: state.reqMade.error,
  };
};

export default connect(mapStateToPropsMade, { fetchReqMade })(RequestsMade);
