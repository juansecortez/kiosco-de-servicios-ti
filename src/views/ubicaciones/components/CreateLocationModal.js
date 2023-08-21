import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button
} from '@mui/material';

const CreateLocationModal = ({ open, onClose, onCreate }) => {
  const [newUbicacion, setNewUbicacion] = useState({
    nombre: '',
    direccion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUbicacion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onCreate(newUbicacion);
    setNewUbicacion({
      nombre: '',
      direccion: ''
    });
  };

  const handleClose = () => {
    setNewUbicacion({
      nombre: '',
      direccion: ''
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Ubicación</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          name="nombre"
          value={newUbicacion.nombre}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Dirección"
          type="text"
          fullWidth
          variant="outlined"
          name="direccion"
          value={newUbicacion.direccion}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLocationModal;
