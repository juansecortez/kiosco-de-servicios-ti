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
  MenuItem 
} from '@mui/material';
import { styled } from '@mui/system';

import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { fetchExternos, deleteExterno, editExterno } from 'src/redux/actions/externosActions';
import EditExternoModal from './EditExternoModal';
import ViewExternoModal from './ViewExternoModal';

const ExternosTable = ({ externos, fetchExternos, deleteExterno, editExterno }) => {
  const [selectedExterno, setSelectedExterno] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openViewModal, setOpenViewModal] = useState(false); // Nuevo estado para el modal de "Ver más"
  const [selectedCompany, setSelectedCompany] = useState('');

  const [page, setPage] = useState(0);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderBottom: '2px solid' + theme.palette.divider,
    padding: theme.spacing(1.5),
  }));

  const StyledTypography = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '1.2rem',
  });
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    fetchExternos();
  }, []);

  const filteredExternos = externos.filter((externo) => {
    const nameMatch = externo.NOMBRES
      ? externo.NOMBRES.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    const companyMatch = externo.EMPRESA
      ? externo.EMPRESA.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    const companyFilter = selectedCompany ? externo.EMPRESA === selectedCompany : true;
    return (nameMatch || companyMatch) && companyFilter;
  });

  const uniqueCompanies = [...new Set(externos.map((item) => item.EMPRESA))];

  const handleOpenModal = (externo) => {
    setSelectedExterno(externo);
    setOpenEditModal(true);
  };

  const handleEdit = async (id, updatedExterno) => {
    console.log('Updated externo: ', updatedExterno);
    await editExterno(id, updatedExterno);
    fetchExternos();
    setOpenEditModal(false);
  };
  const handleOpenViewModal = (externo) => {
    setSelectedExterno(externo);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handleDelete = async (externo) => {
    await deleteExterno(externo.ID);
    fetchExternos();
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
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar..."
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: 25,
            backgroundColor: '#f5f5f5',
            '&:hover': {
              backgroundColor: '#e8e8e8',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery('')} edge="end" size="small">
                  <ClearIcon color="action" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          label="Filtrar por Empresa"
          variant="outlined"
          style={{ marginLeft: '16px' }} // Puedes ajustar el margen según tus necesidades
        >
          <MenuItem value="">Todas las empresas</MenuItem>
          {uniqueCompanies.map((company, index) => (
            <MenuItem key={index} value={company}>
              {company}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['Nombre', 'Empresa', 'Fecha antivirus', 'Fecha pedido', 'Acciones'].map(
                (header, idx) => (
                  <StyledTableCell key={idx}>
                    <StyledTypography variant="h6">{header}</StyledTypography>
                  </StyledTableCell>
                ),
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredExternos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((externo, index) => (
                <TableRow key={externo.ID ? externo.ID : index}>
                  <TableCell>{externo.NOMBRES}</TableCell>
                  <TableCell>{externo.EMPRESA}</TableCell>
                  <TableCell>{formatDate(externo.DATE_ANTIVIRUS)}</TableCell>
                  <TableCell>{formatDate(externo.DATE_PEDIDO)}</TableCell>

                  <TableCell>
                    <Button onClick={() => handleOpenModal(externo)}>Editar</Button>
                    <Button onClick={() => handleDelete(externo)}>Eliminar</Button>
                    <Button onClick={() => handleOpenViewModal(externo)}>Ver mas</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={25}
                count={filteredExternos.length}
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
      <EditExternoModal
        open={openEditModal}
        onClose={handleCloseModal}
        externo={selectedExterno}
        onEdit={handleEdit}
      />
      <ViewExternoModal
        open={openViewModal}
        onClose={handleCloseViewModal}
        externo={selectedExterno}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    externos: state.externosReducer.externos,
    loading: state.externosReducer.loading,
    error: state.externosReducer.error,
  };
};

const mapDispatchToProps = {
  fetchExternos,
  deleteExterno,
  editExterno,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternosTable);
