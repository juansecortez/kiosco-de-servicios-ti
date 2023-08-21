import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Divider,
  TextField,
} from '@mui/material';
import {
  listarComentariosPorServicio,
  agregarComentario,
} from 'src/redux/actions/solicitudActions';

const ServiceModal = ({ openModal, setOpenModal, solicitud }) => {
  const dispatch = useDispatch();
  const comentarios = useSelector((state) => state.solicitudReducer.comentarios);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    if (solicitud) {
      dispatch(listarComentariosPorServicio(`solicitud/comentarios/${solicitud.ID}`, solicitud.ID));
    }
  }, [dispatch, listarComentariosPorServicio, solicitud]);

  const handleAddComment = () => {
    const user = localStorage.getItem('userId');
    const url = 'solicitud/agregarComentario'; // Cambiar a la URL correspondiente
    const post = {
      ID_Servicio: solicitud.ID,
      ID_Usuario: user,
      Comentario: newComment,
    };
  
    dispatch(agregarComentario(url, post))
      .then(() => {
        // Refetch los comentarios luego de agregar uno nuevo.
        dispatch(listarComentariosPorServicio(`solicitud/comentarios/${solicitud.ID}`, solicitud.ID));
        setNewComment(''); // Limpiar el campo de texto
      })
      .catch((error) => {
        // Aquí puedes manejar cualquier error que ocurra durante la solicitud, como mostrar un mensaje de error.
        console.error(error);
      });
  };
  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
      <DialogTitle>Detalles de la Solicitud</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="h5" color="primary">
            Solicitud
          </Typography>
          <Typography variant="h6">Solicitante: {solicitud?.ID_Usuario}</Typography>
          <Typography variant="h6">Tipo de Solicitud: {solicitud?.Tipo}</Typography>
          <Typography variant="h6">Ubicacion: {solicitud?.Ubicacion}</Typography>
          <Typography variant="h6">Jefatura: {solicitud?.Jefatura}</Typography>
          <Typography variant="h6">Estado: {solicitud?.Estado}</Typography>
        </Box>
        <Divider variant="middle" />
        <Box mt={2}>
          <Typography variant="h5" color="primary">
            Descripción de la Solicitud
          </Typography>
          <Typography variant="body1">{solicitud?.Descripcion}</Typography>
        </Box>
        <Divider variant="middle" />
        <Box mt={2}>
          <Typography variant="h5" color="primary">
            Comentarios
          </Typography>
          {comentarios &&
            comentarios.map((comment, index) => (
              <Box key={index} mb={2} p={1} border={1} borderColor="divider">
                <Typography variant="body1">Usuario: {comment.ID_Usuario}</Typography>
                <Typography variant="body1">Comentario: {comment.Comentario}</Typography>
                <Typography variant="body1">
                  Fecha: {new Date(comment.Fecha).toLocaleString()}
                </Typography>
              </Box>
            ))}
        </Box>
        <Divider variant="middle" />
        <Box mt={2}>
          <Typography variant="h5" color="primary">
            Agregar Comentario
          </Typography>
          <Divider variant="middle" />
          <TextField
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
          />
          <Button variant="contained" color="primary" onClick={handleAddComment}>
            Enviar
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => setOpenModal(false)}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceModal;
