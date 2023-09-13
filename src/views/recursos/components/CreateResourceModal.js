import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
const CreateResourceModal = ({ open, onClose, onCreate }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [nivel, setNivel] = useState("");
    const [precio, setPrecio] = useState("");
    const [tipo, setTipo] = useState("");
    const [tipoText, setTipoText] = useState("");
    const [jerarquia, setJerarquia] = useState("");
    const handleSave = () => {
        onCreate({
            nombre: nombre,
            descripcion: descripcion,
            nivel: nivel,
            jerarquia: jerarquia,
            precio: precio,
            tipo_id: tipo
        });
        onClose();
        // Limpiar los campos del formulario
        setNombre("");
        setDescripcion("");
        setNivel("");
        setNivel("");
        setJerarquia("");
        setTipo("");
        setTipoText("");
    };
    const handleTipoChange = (event) => {
        const selectedTipo = event.target.value;
        setTipoText(selectedTipo);
        switch (selectedTipo) {
            case 'Software':
                setTipo(1);
                break;
            case 'Hardware':
                setTipo(2);
                break;
           
            default:
                setTipo("");
                break;
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Crear Recurso</DialogTitle>
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
                <TextField
                    margin="dense"
                    id="descripcion"
                    label="Descripcion"
                    type="text"
                    fullWidth
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
                 <FormControl fullWidth margin="normal">
                    <InputLabel>Nivel</InputLabel>
                    <Select
                        value={nivel}
                        onChange={e => setNivel(e.target.value)}
                    >
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                    
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Jerarquia</InputLabel>
                    <Select
                        value={jerarquia}
                        onChange={e => setJerarquia(e.target.value)}
                    >
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                    
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    id="precio"
                    label="Precio"
                    type="number"
                    fullWidth
                    value={precio}
                    onChange={e => setPrecio(e.target.value)}
                />


                <FormControl fullWidth margin="normal">
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        value={tipoText}
                        onChange={handleTipoChange}
                    >
                        <MenuItem value={'Software'}>Software</MenuItem>
                        <MenuItem value={'Hardware'}>Hardware</MenuItem>
                    
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

export default CreateResourceModal;
