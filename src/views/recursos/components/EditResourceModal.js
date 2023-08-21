import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const EditResourceModal = ({ open, onClose, recurso, onEdit }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (recurso) {
      setNombre(recurso.Nombre);
      setDescripcion(recurso.Descripcion);
      setPrecio(recurso.Precio);
      setTipo(recurso.TipoRecurso);
    }
  }, [recurso]);

  const handleSave = () => {
    onEdit(recurso.Id, {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
    });
    onClose();
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Recurso</DialogTitle>
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
        <TextField
          margin="dense"
          id="precio"
          label="Precio"
          type="number"
          fullWidth
          value={precio}
          onChange={e => setPrecio(e.target.value)}
        />
        <TextField
          margin="dense"
          id="tipo"
          label="Tipo"
          type="text"
          fullWidth
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        />
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

export default EditResourceModal;
