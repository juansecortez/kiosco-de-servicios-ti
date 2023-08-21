import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  Typography,
  InputLabel,
  TextField,
  TablePagination
} from '@mui/material';
import Button from '@mui/material/Button';

import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import { listarSolicitudes, cambiarEstadoServicio } from 'src/redux/actions/solicitudActions';
import ServiceModal from './components/ServiceModal';

const Solicitudes = ({
  solicitudes,
  comentarios,
  service,
  listarSolicitudes,
  cambiarEstadoServicio,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  useEffect(() => {
    listarSolicitudes('solicitud/listarSolicitudes').catch((error) =>
      console.error('Failed to fetch solicitudes:', error),
    );
  }, [listarSolicitudes]);

  const handleChangeEstado = (ID, Estado) => {
    cambiarEstadoServicio('solicitud/cambiarEstadoServicio', { ID, Estado })
      .then(() => listarSolicitudes('solicitud/listarSolicitudes'))
      .catch((error) => console.error('Failed to change estado:', error));
  };
  const statusColors = {
    Pendiente: 'red',
    'En Progreso': 'orange',
    Completado: 'green',
  };
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Vuelve a la primera página cuando cambias las filas por página
  };


  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    return (
      (filterEstado === '' || solicitud.Estado === filterEstado) &&
      (searchQuery === '' ||
        solicitud.ID_Usuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solicitud.Tipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // Puedes agregar más condiciones de búsqueda aquí
        solicitud.Ubicacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solicitud.Jefatura.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  const currentPageSolicitudes = filteredSolicitudes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenModal = (solicitud) => {
    setSelectedService(solicitud);
    setOpenModal(true);
  };

  return (
    <PageContainer description="this is solicitudes page">
      <DashboardCard title="MANEJO DE SOLICITUDES">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <TextField
            label="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FormControl style={{ minWidth: 150, marginLeft: 'auto' }}>
            <InputLabel>Filtrar por Estado</InputLabel>
            <Select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="En Progreso">En Progreso</MenuItem>
              <MenuItem value="Completado">Completado</MenuItem>
              {/* Agrega aquí los estados adicionales que necesites */}
            </Select>
          </FormControl>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Solicitante
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Tipo de solicitud
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Ubicacion
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Jefatura
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Estado
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Acciones
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {currentPageSolicitudes &&
              currentPageSolicitudes.length > 0 &&
              currentPageSolicitudes.map((solicitud, index) => (
                <TableRow key={index}>
                  <TableCell>{solicitud.ID_Usuario}</TableCell>
                  <TableCell>{solicitud.Tipo}</TableCell>
                  <TableCell>{solicitud.Ubicacion}</TableCell>
                  <TableCell>{solicitud.Jefatura}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        backgroundColor: statusColors[solicitud.Estado],
                        padding: '5px 9px',
                        borderRadius: '20px',
                        color: 'transparent', // O el color que prefieras para el texto
                        fontWeight: 'bold',
                        height: '10px',
                        width:'130px'
                      }}
                    >
                      {solicitud.Estado}
                    </div>
                    <FormControl>
                      <Select
                        value={solicitud.Estado}
                        onChange={(e) => handleChangeEstado(solicitud.ID, e.target.value)}
                      >
                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                        <MenuItem value="En Progreso">En Progreso</MenuItem>
                        <MenuItem value="Completado">Completado</MenuItem>
                        {/* Agrega aquí los estados adicionales que necesites */}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenModal(solicitud)}>VER MAS</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredSolicitudes.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DashboardCard>
      <ServiceModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        solicitud={selectedService}
        comentarios={comentarios}
      />
    </PageContainer>
  );
};
const mapStateToProps = (state) => ({
  solicitudes: state.solicitudReducer.solicitudes,
  comentarios: state.comentarioReducer ? state.comentarioReducer.comentarios : [],
  service: state.solicitudReducer.service, // Añade esto
});

const mapDispatchToProps = {
  listarSolicitudes,
  cambiarEstadoServicio,
};

export default connect(mapStateToProps, mapDispatchToProps)(Solicitudes);
