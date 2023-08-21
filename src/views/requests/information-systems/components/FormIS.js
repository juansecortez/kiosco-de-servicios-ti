import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';

const FormIS = ({ addData, closeModal }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    addData(formData);
    setFormData({});
    closeModal();
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label-name">Nombre del sistema</InputLabel>
          <Select
            labelId="select-label-name"
            id="name"
            label="Nombre del sistema"
            name="nameIS"
            value={formData.nameIS || ''}
            onChange={handleChange}
          >
            <MenuItem value={'SAP'}>SAP</MenuItem>
            <MenuItem value={'Carpetas de X'}>Carpetas de X</MenuItem>
            <MenuItem value={'MneOps'}>MneOps</MenuItem>
            <MenuItem value={'Masterweb'}>Masterweb</MenuItem>
            <MenuItem value={'Global/protect'}>Global/protect</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel htmlFor="component-outlined">Función a desarrollar</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Funcion a desarrollar"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
          />
        </FormControl>
        <Stack sx={{ mt: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Autorizado por Responsable del Área
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            (Anexar el ok via electrónico)
          </Typography>

          <Button
            variant="contained"
            component="label"
            color="buttonPrimary"
            value={formData.file || ''}
            onChange={handleChange}
          >
            Upload
            <input hidden accept="*/*" multiple type="file" name="file" />
          </Button>
          <p>{formData.file}</p>
        </Stack>
      </Box>
      <Stack direction="row" sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="buttonDanger" onClick={closeModal}>
          Cancelar
        </Button>
        <hr color="white" />
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Agregar
        </Button>
      </Stack>
    </>
  );
};

export default FormIS;
