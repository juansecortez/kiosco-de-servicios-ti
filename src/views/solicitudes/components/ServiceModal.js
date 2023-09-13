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
  agregarImagen,
} from 'src/redux/actions/solicitudActions';

const API_BASE_URL = 'http://vwebgama:4001/api/v1';

const ServiceModal = ({ openModal, setOpenModal, solicitud }) => {
  const dispatch = useDispatch();
  const comentarios = useSelector((state) => state.solicitudReducer.comentarios);
  const [newComment, setNewComment] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Nuevo estado para la imagen seleccionada

  const userData = JSON.parse(localStorage.getItem('user'));
  const userRole = userData?.role || '';
  const handleImageError = (e) => {
    e.target.closest('a').style.display = 'none';
  };
  useEffect(() => {
    if (solicitud) {
      // Obtener los comentarios
      dispatch(listarComentariosPorServicio(`solicitud/comentarios/${solicitud.ID}`, solicitud.ID));
    }
  }, [dispatch, solicitud]);
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  const handleAddComment = async (event) => {
    event.preventDefault();
    const user = localStorage.getItem('userId');
    const url = 'solicitud/agregarComentario';

    const post = {
      ID_Servicio: solicitud.ID,
      ID_Usuario: user,
      Comentario: newComment,
    };

    try {
      // Primero, agregamos el comentario.
      const response = await dispatch(agregarComentario(url, post));
      const idComentario = response.ID_Comentario;

      console.log('ID del comentario agregado:', idComentario);

      if (selectedImage) {
        // Si se seleccionó una imagen, la agregamos.
        const formData = new FormData();
        formData.append('imagen', selectedImage);
        formData.append('ID_Comentario', idComentario);

        await dispatch(
          agregarImagen('solicitud/subirImagen', selectedImage, null, idComentario, null),
        );
      }

      // Luego, refrescamos los comentarios.
      dispatch(listarComentariosPorServicio(`solicitud/comentarios/${solicitud.ID}`, solicitud.ID));

      // Limpiamos el estado
      setNewComment('');
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      // Puede que quieras manejar el error de alguna manera específica aquí, por ejemplo mostrando un mensaje al usuario.
    }
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
          <Typography variant="h5" color="primary">
            Adjuntos
          </Typography>
          <a
            href={`${API_BASE_URL}/solicitud/imagen/servicio/${solicitud?.ID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${API_BASE_URL}/solicitud/imagen/servicio/${solicitud?.ID}`}
              alt="Imagen adjunta"
              style={{
                maxWidth: '50%',
                height: 'auto',
                margin: '10px 0',
                borderRadius: '4px', // redondear un poco las esquinas
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // sombra ligera para darle profundidad
              }}
              onError={handleImageError}
            />
          </a>
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
                <a
                  href={`${API_BASE_URL}/solicitud/imagen/comentario/${comment.ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${API_BASE_URL}/solicitud/imagen/comentario/${comment.ID}`}
                    alt="No hay imagen adjunta"
                    style={{ maxWidth: '40%', height: 'auto', margin: '10px 0' }}
                    onError={handleImageError}
                  />
                </a>
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

          {/* Restringir el acceso al input de archivo solo para el administrador */}
          {userRole === 'Administrador' && <input type="file" onChange={handleImageChange} />}

          <Divider variant="middle" />
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
