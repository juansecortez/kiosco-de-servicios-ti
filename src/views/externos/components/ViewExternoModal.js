import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Chip,
  Button,
  Box,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonIcon from '@mui/icons-material/Person';
import { agregarImagen } from 'src/redux/actions/solicitudActions';
import Gallery from './Gallery';

const ViewExternoModal = ({ open, onClose, externo, onImageUploaded }) => {
  const [localExterno, setLocalExterno] = useState(externo || {});
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleAddImage = (externo) => {
    if (selectedImage) {
      const externoId = externo.ID;
      const formData = new FormData();
      formData.append('imagen', selectedImage);
      formData.append('ID_Externo', externoId);

      dispatch(agregarImagen('solicitud/subirImagen', selectedImage, null, null, externoId))
        .then(() => {
          if (onImageUploaded) {
            onImageUploaded();
          }
          // Aquí actualizamos el estado para mostrar que se subió con éxito
          setUploadSuccess(true);
        })
        .catch(() => {
          setUploadSuccess(false); // Puedes manejar errores aquí si es necesario.
        });
    }
  };

  useEffect(() => {
    setLocalExterno(externo || {});
  }, [externo, open]);

  useEffect(() => {
    if (!open) {
      setLocalExterno({});
      setSelectedImage(null);
      setUploadSuccess(false); 
    }
  }, [open]);


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle sx={{ textAlign: 'center' }}>
        {localExterno.NOMBRES ? (
          <>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}>
              <PersonIcon style={{ fontSize: 40 }} />
            </Avatar>
            <Typography>{`${localExterno.NOMBRES} - Detalles`}</Typography>
          </>
        ) : (
          'Detalles'
        )}
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Grid container spacing={3}>
          {/* Detalles del externo */}
          {[
            'EMPRESA',
            'NOMBRES',
            'MAC_WIFI',
            'DATE_ANTIVIRUS',
            'DATE_PEDIDO',
            'AREA_PECO',
            'RED',
          ].map((itemKey, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Paper variant="outlined" sx={{ padding: 2 }}>
                <Typography variant="h6">{itemKey.replace('_', ' ')}:</Typography>
                <Typography variant="body1">{localExterno[itemKey]}</Typography>
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Documentos peco:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {[{ key: 'CONTRATO_CONFIDENCIALIDAD', label: 'Contrato Confidencialidad' }].map(
                (item, idx) =>
                  localExterno[item.key] === 'S' && (
                    <Chip key={idx} icon={<InfoIcon />} label={item.label} variant="outlined" />
                  ),
              )}
            </Box>
            <Typography variant="h6" gutterBottom>
              Recursos peco:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {[
                { key: 'CONTRATO_CONFIDENCIALIDAD', label: 'Contrato Confidencialidad' },
                { key: 'CORREO', label: 'Correo' },
                { key: 'USER_AD', label: 'Usuario AD' },
                { key: 'O365', label: 'O365' },
                { key: 'TEAMS', label: 'Teams' },
                { key: 'VPN', label: 'VPN' },
                { key: 'ENDPOINT', label: 'Endpoint' },
              ].map(
                (item, idx) =>
                  localExterno[item.key] === 'S' && (
                    <Chip key={idx} icon={<InfoIcon />} label={item.label} variant="outlined" />
                  ),
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Agregar nueva evidencia:
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <input
                type="file"
                id="upload-button"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor="upload-button">
                <Button variant="outlined" component="span" startIcon={<AddPhotoAlternateIcon />}>
                  Seleccionar imagen
                </Button>
              </label>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddImage(localExterno)}
                disabled={!selectedImage}
              >
                Subir
              </Button>
            </Box>
            {/* Aquí mostramos el mensaje de éxito */}
            {uploadSuccess && (
              <Typography color="green" style={{ marginTop: 10 }}>
                Imagen subida con éxito!
              </Typography>
            )}
          </Grid>
        </Grid>

        <Box mt={3}>
          {localExterno.ID && <Gallery key={localExterno.ID} ID_Externo={localExterno.ID} />}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewExternoModal;
