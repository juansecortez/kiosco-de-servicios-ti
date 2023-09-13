import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button
} from '@mui/material';

const EditUbicacionModal = ({ open, onClose, ubicacion, onEdit }) => {
  const [editedUbicacion, setEditedUbicacion] = useState({
    nombre: ubicacion ? ubicacion.nombre : '',
    direccion: ubicacion ? ubicacion.direccion : ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUbicacion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onEdit(ubicacion.ID, editedUbicacion);
  };

  const handleClose = () => {
    setEditedUbicacion({
      nombre: ubicacion ? ubicacion.UbicacionNombre : ''
      
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Ubicación</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          name="nombre"
          value={editedUbicacion.nombre}
          onChange={handleInputChange}
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUbicacionModal;
