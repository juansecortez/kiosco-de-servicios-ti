import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
 
  MenuItem,
  InputAdornment,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateLocationModal = ({ open, onClose, onCreate, zonas, addZona, deleteZona, fetchZonas }) => {
  const [newLocation, setNewUbicacion] = useState({
    nombre: '',
    zonaID: '',
  });
  const [zonaName, setZonaName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUbicacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteZona = (id) => {
    deleteZona(id)
      .then(() => {
        fetchZonas(); // Refrescar las zonas
      })
      .catch(error => console.error("Error al eliminar la zona:", error));
  };

  const handleSave = () => {
    onCreate(newLocation);
    setNewUbicacion({
      nombre: '',
      zonaID: '',
    });
  };
  const handleAddZona = () => {
    if (zonaName.trim() !== "") { // Solo agregar si no está vacío
      addZona({ nombre: zonaName })
        .then(() => {
          fetchZonas(); // Refrescar las zonas
          setZonaName(''); // Limpiar el input
        })
        .catch(error => console.error("Error al agregar zona:", error));
    } else {
      console.warn("El nombre de la zona no puede estar vacío");
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };
  
  const handleClose = () => {
    setNewUbicacion({
      nombre: '',
      zonaID: '',
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
          value={newLocation.nombre}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          name="zonaID"
          value={newLocation.zonaID}
          onChange={handleInputChange}
          select
          label="Zona"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddZona}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        >
          {zonas &&
  zonas.map((zona) => (
    <MenuItem key={zona.ID} value={zona.ID}>
      {zona.Nombre}
      <IconButton onClick={() => handleDeleteZona(zona.ID)}>
        <DeleteIcon />
      </IconButton>
    </MenuItem>
))}
        </TextField>
        <TextField
          fullWidth
          value={zonaName}
          onChange={(e) => setZonaName(e.target.value)}
          placeholder="Agregar nueva zona"
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
