import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import ServiceModal from 'src/views/solicitudes/components/ServiceModal';
import {
  Chip,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
    Tooltip,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { listarSolicitudesId } from '../../../redux/actions/solicitudActions'; // Asegúrate de que la ruta sea correcta
import { IconEye } from '@tabler/icons';



const TodasLasSolicitudes = ({ solicitudes, error, listarSolicitudesId,comentarios, }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const auth = useSelector((state) => state.auth.user.USUARIOID);
 
  const handleOpenModal = (solicitud) => {
    setSelectedService(solicitud);
    setOpenModal(true);
  };
  

  useEffect(() => {
    console.log(auth);
    listarSolicitudesId(`solicitud/listarSolicitudesId/${auth}`);
  }, []);
  
  

  if (error) {
    console.log(`Error al cargar todas las solicitudes: ${error}`);
    return null;
  }

  if (!solicitudes || solicitudes.length === 0) {
    return (
      <Typography variant="subtitle1" fontWeight={600} align='center'>
        No ha echo solicitudes de servicio técnico.
      </Typography>
    );
  }

  return (
    <DashboardCard title="Solicitudes de servicio técnico">
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
    {solicitudes && solicitudes.map((solicitud) => (
        <TableRow key={solicitud.ID}>
            <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                    {solicitud.Tipo}  {/* Cambiado de solicitud.tipo_nombreSolicitud */}
                </Typography>
            </TableCell>
            <TableCell>
                
                {solicitud.FechaCreacion ? new Date(solicitud.FechaCreacion).toISOString().split('T')[0] : "Fecha no disponible"}
            </TableCell>
            <TableCell sx={{ textAlign: 'center' }}>
                <Chip
                    sx={{
                        px: '4px',
                        backgroundColor: (() => {
                            switch (solicitud.Estado) {
                              case 'Pendiente':
                                return 'red';
                              case 'En Progreso':
                                return 'yellow';
                              case 'Completado':
                                return 'green';
                              default:
                                return 'gray'; // color por defecto en caso de que no haya coincidencia
                            }
                          })(),
                          
                    }}
                    size="small"
                    label={solicitud.Estado}  // Actualizado el nombre del campo del estado
                ></Chip>
            </TableCell>
            <TableCell sx={{ textAlign: 'center' }}>
                <Tooltip
                    sx={{ zIndex: 20, position: 'unset' }}
                    title="Ver"
                    onClick={() => handleOpenModal(solicitud)}
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
        
      </TableContainer>
      <ServiceModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        solicitud={selectedService}
        comentarios={comentarios}
      />
    </DashboardCard>
  );
};

const mapStateToProps = (state) => {
  return {
    solicitudes: state.solicitudReducer.solicitudes,
    comentarios: state.comentarioReducer ? state.comentarioReducer.comentarios : [],
  };
};

export default connect(mapStateToProps, { listarSolicitudesId })(TodasLasSolicitudes);
