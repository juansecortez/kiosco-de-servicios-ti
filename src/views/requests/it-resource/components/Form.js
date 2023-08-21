import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux'; // Importa el dispatch desde react-redux
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  FormHelperText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DashboardCard from 'src/components/shared/DashboardCard';
import CustomDialog from 'src/components/shared/CustomDialog';
import { connect, useSelector } from 'react-redux';
import {
  fetchDirections,
  fetchManagement,
  fetchLeadership,
  fetchComputerResources,
  fetchSubResources,
} from '../../../../redux/actions/selectsActions';
import { postaPI, postAPI} from 'src/utils/FetchData';
import ResourcesModal from './ResourcesModal';

const initialState = {
  direction: '',
  management: '',
  leadership: '',
  applicant: '',
  justification: '',
  type: '',
  quantity: '',
  description: '',
  subresource: ''
  
};

const Form = ({
  directions,
  management,
  leadership,
 
  fetchDirections,
  fetchManagement,
  fetchLeadership,
  fetchComputerResources,
  fetchSubResources,
}) => {
  const [selectedSubResource, setSelectedSubResource] = useState('');
  const [resources, setResources] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const auth = useSelector((state) => state.auth.user.USUARIOID);
  const [data, setData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDirections();
    fetchManagement();
    fetchLeadership();
    fetchComputerResources();
  }, []);


  const handleOpenModal = (recurso) => {
    setSelectedSubResource(recurso);
    setOpenEditModal(true);
  };
  const handleResourceChange = async (event) => {
    const fetchedResources = await fetchSubResources(event.target.value);
    setResources(fetchedResources);
    handleOpenModal();
    // Aquí actualizamos el valor del estado con el valor numérico seleccionado
    setData(prevData => ({ ...prevData, type: event.target.value }));
  };
  

  const handleList = async (recurso) => {
    setSelectedSubResource(recurso.nombre_y_precio); // Asume que 'recurso' es un objeto con la propiedad 'nombre_y_precio'.
    setOpenEditModal(false);
  };
  const handleCloseModal = () => {
    setOpenEditModal(false);
  };
  const handleChangeInput = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const clearFields = () => {
    setData(initialState);
  };


  const handleSendEmails = async (to, cc, title, txt, url) => {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    await postaPI(
      "mail/sendemail",
      {
        to,
        cc,
        title,
        txt,
        url
      }
    )
      .then((res) => {
        dispatch({ type: 'ALERT', payload: { loading: false } });
        dispatch({ type: 'ALERT', payload: { success: res.data.message } });
      })
      .catch((error) => {
        dispatch({ type: 'ALERT', payload: { loading: false } });
        dispatch({
          type: 'ALERT',
          payload: { errors: error.response.data.message },
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.direction ||
      !data.management ||
      !data.leadership ||
      !data.applicant ||
      !data.justification ||
      !data.type ||
      !data.quantity ||
      !data.description
    ) {
      setOpen(true);
      return;
    }

    const dataToSend = {
      tipo_id: 3,
      sol_usuarioidSolicitante: auth || null,
      recu_direccion: data.direction || null,
      recu_gerencia: data.management || null,
      recu_jefatura: data.leadership || null,
      recu_solicitante: data.applicant || null,
      recu_justificacion: data.justification || null,
      recu_tipoRecursoInfo: data.type || null,
      recu_cantidad: data.quantity || null,
      recu_descripcion: data.description || null,
      recu_recu:selectedSubResource
    };

    try {
      const res = await postAPI('make/accessResource', dataToSend);
      dispatch({
        // Usa el dispatch para enviar la acción
        type: 'ALERT',
        payload: { success: res.data.message },
      });
    
      
      await handleSendEmails(
        'residente10@pcolorada.com',
        '',
        'NUEVA SOLICITUD',
        'Tienes una nueva solicitud  pendiente por aprobar, por favor dirigete al sistema Kiosco TI ingresando al siguiente link :',
        'http://vwebgama:4002',
      )
      
    
    } catch (error) {
      console.log(error);
    }

    console.log(data);
    clearFields();
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <DashboardCard title="SOLICITUD DE RECURSO INFORMÁTICO">
      <Grid sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-direction">Dirección</InputLabel>
                <Select
                  labelId="select-label-direction"
                  id="direction"
                  label="Dirección"
                  value={data.direction || ''}
                  onChange={handleChangeInput('direction')}
                >
                  {directions.map((direction) => (
                    <MenuItem key={direction.dir_id} value={direction.dir_nombre}>
                      {direction.dir_nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione la dirección a la que pertenece.</FormHelperText>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-management">Gerencia</InputLabel>
                <Select
                  labelId="select-label-management"
                  id="management"
                  label="Gerencia"
                  value={data.management || ''}
                  onChange={handleChangeInput('management')}
                >
                  {management.map((gerencia) => (
                    <MenuItem key={gerencia.ger_id} value={gerencia.ger_nombre}>
                      {gerencia.ger_nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione la Gerencia de su area.</FormHelperText>
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-leadership">Jefatura</InputLabel>
                <Select
                  labelId="select-label-leadership"
                  id="leadership"
                  label="Jefatura"
                  value={data.leadership || ''}
                  onChange={handleChangeInput('leadership')}
                >
                  {leadership.map((jefatura) => (
                    <MenuItem key={jefatura.jef_id} value={jefatura.jef_nombre}>
                      {jefatura.jef_nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione su jefatura correspondiente.</FormHelperText>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <TextField
                fullWidth
                label="Solicitante"
                id="applicant"
                sx={{ m: 1 }}
                value={data.applicant}
                onChange={handleChangeInput('applicant')}
                helperText="Escriba su nombre completo."
              />
            </Stack>

            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Justificación"
                id="justification"
                multiline
                rows={5}
                value={data.justification || ''}
                onChange={handleChangeInput('justification')}
                helperText="Explique por que necesita el recurso."
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-type">Tipo de recurso informático</InputLabel>
                <Select
                  labelId="select-label-type"
                  id="type"
                  label="Tipo de recurso informático"
                  value={data.type}
                  onChange={handleResourceChange}
                >
                  <MenuItem value={1}>Hardware</MenuItem>
                  <MenuItem value={2}>Software</MenuItem>
                  
                </Select>
                <FormHelperText>Seleccione el tipo de recurso que necesita.</FormHelperText>
              </FormControl>
            </Stack>

            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            ></Stack>

            <TextField
              fullWidth
              label="Recurso seleccionado"
              id="subresource"
              sx={{ m: 1 }}
              value={selectedSubResource}
              disabled // Hace que el campo sea de solo lectura.
              helperText="Seleccione el recurso que necesita."
            />
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <TextField
                fullWidth
                label="Cantidad"
                id="quantity"
                sx={{ m: 1 }}
                value={data.quantity || ''}
                onChange={handleChangeInput('quantity')}
                helperText="ingrese en números la cantidad de recursos que necesita."
              />
              <TextField
                fullWidth
                label="Descripción"
                id="description"
                sx={{ m: 1 }}
                value={data.description || ''}
                onChange={handleChangeInput('description')}
                helperText="Cuentenos mas sobre sus solicitud."
              />
            </Stack>
            <Stack direction="row" spacing={2} padding={1}>
              <Button
                variant="contained"
                color="buttonDanger"
                startIcon={<DeleteIcon />}
                onClick={clearFields}
              >
                Borrar
              </Button>
              <Button
                variant="contained"
                color="buttonSuccess"
                endIcon={<SendIcon />}
                type="submit"
              >
                Enviar
              </Button>
            </Stack>
          </Box>
        </form>
      </Grid>
      <CustomDialog
        open={open}
        onClose={closeModal}
        title="Advertencia"
        content="Por favor, llene todos los campos"
        actions={[{ label: 'Aceptar', onClick: closeModal }]}
      />
       <ResourcesModal
      open={openEditModal}
      onClose={handleCloseModal}
      recurso={selectedSubResource}
      onList={handleList}
      resources={resources} // pasa los recursos como una propiedad
    />
    </DashboardCard>
  );
};

const mapStateToProps = (state) => ({
  directions: state.selects.directions,
  management: state.selects.management,
  leadership: state.selects.leadership,
 
});

const mapDispatchToProps = (dispatch) => ({
  fetchDirections: () => dispatch(fetchDirections()),
  fetchManagement: () => dispatch(fetchManagement()),
  fetchLeadership: () => dispatch(fetchLeadership()),
  fetchComputerResources: () => dispatch(fetchComputerResources()),
  fetchSubResources: (tipo_id) => dispatch(fetchSubResources(tipo_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

