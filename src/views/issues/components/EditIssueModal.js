import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const EditIssueModal = ({ open, onClose, issue, onEdit }) => {
    const [nombre, setNombre] = useState("");
   
    const [tipo, setTipoIssue] = useState("");

    useEffect(() => {
        if (issue) {
            setNombre(issue.nombre);
            
            setTipoIssue(issue.tipo);
        }
    }, [issue]);

    const handleSave = () => {
        const tipo_id = tipo === 'Incidente' ? 1 : 2;
    
        onEdit(issue.id, {
            nombre: nombre,
            tipo_id: tipo_id
        });
    
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Issue</DialogTitle>
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
                        value={tipo}
                        onChange={e => setTipoIssue(e.target.value)}
                    >
                        <MenuItem value={'Requerimiento'}>Requerimiento</MenuItem>
                        <MenuItem value={'Incidente'}>Incidente</MenuItem>
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

export default EditIssueModal;
