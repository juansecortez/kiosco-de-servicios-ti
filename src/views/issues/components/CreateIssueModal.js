import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CreateIssueModal = ({ open, onClose, onCreate }) => {
    const [nombre, setNombre] = useState("");

    const [tipoIssue, setTipoIssue] = useState("");

    const handleSave = () => {
        onCreate({
            nombre: nombre,
            
            tipo_id: tipoIssue
        });
        onClose();
        // Limpiar los campos del formulario
        setNombre("");   
        setTipoIssue("");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Crear Issue</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nombre"
                    label="Nombre"
                    type="text"
                    fullWidth
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
               
               
                <FormControl fullWidth margin="normal">
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        value={tipoIssue}
                        onChange={e => setTipoIssue(e.target.value)}
                    >
                        <MenuItem value={1}>Incidente</MenuItem>
                        <MenuItem value={2}>Requerimiento</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateIssueModal;
