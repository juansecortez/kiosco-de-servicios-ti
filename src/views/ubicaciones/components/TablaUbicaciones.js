import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  TableFooter,
  TablePagination,
  Box,
  Typography,
} from '@mui/material';

import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import {
  fetchUbicaciones,
  deleteUbicacion,
  editUbicacion,
} from 'src/redux/actions/zonasUbicacionActions';

import EditUbicacionModal from './EditUbicacionModal';

const UbicacionesTable = ({ ubicaciones, fetchUbicaciones, deleteUbicacion, editUbicacion }) => {
  const [selectedUbicacion, setSelectedUbicacion] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const filteredUbicaciones = ubicaciones.filter((ubicacion) =>
    ubicacion.UbicacionNombre
      ? ubicacion.UbicacionNombre.toLowerCase().includes(searchQuery.toLowerCase())
      : true,
  );

  const handleOpenModal = (ubicacion) => {
    setSelectedUbicacion(ubicacion);
    setOpenEditModal(true);
  };

  const handleEdit = async (id, updatedUbicacion) => {
    await editUbicacion(id, updatedUbicacion);
    fetchUbicaciones();
    setOpenEditModal(false);
  };

  const handleDelete = async (ubicacion) => {
    await deleteUbicacion(ubicacion.ID);
    fetchUbicaciones();
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <TextField
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Nombre
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Zona
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
            {filteredUbicaciones
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ubicacion, index) => (
                <TableRow key={ubicacion.ID ? ubicacion.ID : index}>
                  <TableCell>{ubicacion.UbicacionNombre}</TableCell>
                  {/* Cambiado de Nombre a UbicacionNombre */}
                  <TableCell>{ubicacion.ZonaNombre}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenModal(ubicacion)}>Editar</Button>
                    <Button onClick={() => handleDelete(ubicacion)}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={filteredUbicaciones.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <EditUbicacionModal
        open={openEditModal}
        onClose={handleCloseModal}
        ubicacion={selectedUbicacion}
        onEdit={handleEdit}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ubicaciones: state.zonasUbicacionReducer?.ubicaciones || [],
    loading: state.zonasUbicacionReducer?.loading,
    error: state.zonasUbicacionReducer?.error,
  };
};

const mapDispatchToProps = {
  fetchUbicaciones,
  deleteUbicacion,
  editUbicacion,
};

export default connect(mapStateToProps, mapDispatchToProps)(UbicacionesTable);
