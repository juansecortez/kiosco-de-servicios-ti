import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button,
    TextField, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem, TableFooter, TablePagination, Box, Typography
} from '@mui/material';

import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { fetchRecursos, deleteRecurso, editRecurso } from 'src/redux/actions/recursosActions';
import EditResourceModal from './EditResourceModal';

const ResourceTable = ({ recursos, fetchRecursos, deleteRecurso, editRecurso }) => {
    const [selectedResource, setSelectedResource] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tipoFilter, setTipoFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    useEffect(() => {
        fetchRecursos();
    }, []);


    const filteredRecursos = recursos
        .filter(recurso => recurso.Nombre ? recurso.Nombre.toLowerCase().includes(searchQuery.toLowerCase()) : true)
        .filter(recurso => tipoFilter ? (recurso.TipoRecurso ? recurso.TipoRecurso === tipoFilter : false) : true);

    const handleOpenModal = (recurso) => {
        setSelectedResource(recurso);
        setOpenEditModal(true);
    };

    const handleEdit = async (id, updatedResource) => {
        console.log("Updated resource: ", updatedResource);
        await editRecurso(id, updatedResource);
        fetchRecursos();
        setOpenEditModal(false);
    };

    const handleDelete = async (recurso) => {
        await deleteRecurso(recurso.Id);
        fetchRecursos();
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

    const handleTipoFilterChange = (event) => {
        setTipoFilter(event.target.value);
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
                <FormControl style={{ minWidth: '200px' }}>
                    <InputLabel>Tipo de recurso</InputLabel>
                    <Select
                        value={tipoFilter}
                        onChange={handleTipoFilterChange}
                    >
                        <MenuItem value={''}>Todos</MenuItem>
                        <MenuItem value={'software'}>Software</MenuItem>
                        <MenuItem value={'hardware'}>Hardware</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6" fontWeight="bold">Nombre</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" fontWeight="bold">Descripcion</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" fontWeight="bold">Precio</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" fontWeight="bold">Tipo</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" fontWeight="bold">Acciones</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredRecursos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((recurso, index) => (
                            <TableRow key={recurso.Id ? recurso.Id : index}>
                                <TableCell>{recurso.Nombre}</TableCell>
                                <TableCell>{recurso.Descripcion}</TableCell>
                                <TableCell>{recurso.Precio}</TableCell>
                                <TableCell>{recurso.TipoRecurso}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpenModal(recurso)}>Editar</Button>
                                    <Button onClick={() => handleDelete(recurso)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={25}
                                count={filteredRecursos.length}
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
            <EditResourceModal
                open={openEditModal}
                onClose={handleCloseModal}
                recurso={selectedResource}
                onEdit={handleEdit}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        recursos: state.recursoReducer.recursos,
        loading: state.recursoReducer.loading,
        error: state.recursoReducer.error
    };
};

const mapDispatchToProps = {
    fetchRecursos,
    deleteRecurso,
    editRecurso,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceTable);
