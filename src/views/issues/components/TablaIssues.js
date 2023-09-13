import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button,
    TextField, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem, TableFooter, TablePagination, Box, Typography
} from '@mui/material';

import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { fetchIssues, deleteIssue, editIssue } from '../../../redux/actions/issueActions';
import EditIssueModal from './EditIssueModal';

const IssueTable = ({ issues, fetchIssues, deleteIssue, editIssue }) => {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tipoFilter, setTipoFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    useEffect(() => {
        fetchIssues();
    }, []);

    const filteredIssues = issues
        .filter(issue => issue.nombre ? issue.nombre.toLowerCase().includes(searchQuery.toLowerCase()) : true)
        .filter(issue => tipoFilter ? (issue.tipo ? issue.tipo === tipoFilter : false) : true);

    const handleOpenModal = (issue) => {
        setSelectedIssue(issue);
        setOpenEditModal(true);
    };

    const handleEdit = async (id, updatedIssue) => {
        await editIssue(id, updatedIssue);
        fetchIssues();
        setOpenEditModal(false);
    };

    const handleDelete = async (issue) => {
        await deleteIssue(issue.id);
        fetchIssues();
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
                    <InputLabel>Tipo de Issue</InputLabel>
                    <Select
                        value={tipoFilter}
                        onChange={handleTipoFilterChange}
                    >
                        <MenuItem value={''}>Todos</MenuItem>
                        {/* Aquí puedes agregar más tipos de issues si es necesario */}
                        <MenuItem value={'Incidente'}>Incidente</MenuItem>
                        <MenuItem value={'Requerimiento'}>Requerimiento</MenuItem>
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
                                <Typography variant="h6" fontWeight="bold">Tipo</Typography>
                            </TableCell>
                          
                            <TableCell>
                                <Typography variant="h6" fontWeight="bold">Acciones</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredIssues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((issue, index) => (
                            <TableRow key={issue.id ? issue.id : index}>
                                <TableCell>{issue.nombre}</TableCell>
                                <TableCell>{issue.tipo}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpenModal(issue)}>Editar</Button>
                                    <Button onClick={() => handleDelete(issue)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={25}
                                count={filteredIssues.length}
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
            <EditIssueModal
                open={openEditModal}
                onClose={handleCloseModal}
                issue={selectedIssue}
                onEdit={handleEdit}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        issues: state.issueReducer.issues,
        loading: state.issueReducer.loading,
        error: state.issueReducer.error
    };
};

const mapDispatchToProps = {
    fetchIssues,
    deleteIssue,
    editIssue,
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueTable);
