import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux'; // Importa el dispatch desde react-redux
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Box,
  FormHelperText,
} from '@mui/material';

import DashboardCard from 'src/components/shared/DashboardCard';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { postaPI, postAPI } from 'src/utils/FetchData';
import CustomDialog from 'src/components/shared/CustomDialog';
import { connect } from 'react-redux';
import {
  fetchDirections,
  fetchManagement,
  fetchLeadership,
} from '../../../../redux/actions/selectsActions';

const initialState = {
  name: '',
  direction: null,
  management: null,
  leadership: null,
  startDate: '',
  endDate: '',
  needsEmail: '',
  needsPC: '',
};

const Forms = ({
  directions,
  management,
  leadership,
  fetchDirections,
  fetchManagement,
  fetchLeadership,
}) => {
  const user = localStorage.getItem('userId');
  const nombre = localStorage.getItem('nombre');
  const [data, setData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDirections();
    fetchManagement();
    fetchLeadership();
  }, []);

  const handleChangeInput = (prop) => (event) => {
    setData((prevData) => ({
      ...prevData,
      [prop]: event.target.value,
    }));
  };

  const clearFields = () => {
    setData(initialState);
  };
  const handleSendEmails = async (
    to,
    cc,
    title,
    txt,
    urlAceptacion,
    urlRechazo,
    solicitante,
    solicitud,
  ) => {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    await postaPI('mail/sendemail1', {
      to,
      cc,
      title,
      txt,
      urlAceptacion,
      urlRechazo,
      solicitante,
      solicitud,
    })
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

  const addEmployee = async (event) => {
    event.preventDefault();

    if (
      !data.name ||
      !data.direction ||
      !data.management ||
      !data.leadership ||
      !data.startDate ||
      !data.endDate ||
      !data.needsEmail ||
      !data.needsPC
    ) {
      setOpen(true);
      return;
    }

    const dataToSend = {
      tipo_id: 1,
      sol_usuarioidSolicitante: user || null,
      altas_nombreColaborador: data.name || null,
      altas_direccion: data.direction || null,
      altas_gerencia: data.management?.ger_nombre || null, // Modificado aquí
      altas_jefatura: data.leadership?.jef_nombre || null,
      altas_fechaInicio: data.startDate || null,
      altas_fechaFin: data.endDate || null,
      altas_necesitaCorreo: data.needsEmail || null,
      altas_necesitaComputadora: data.needsPC || null,
    };

    try {
      const res = await postAPI('make/userResgistration', dataToSend);
      console.log('Respuesta del servidor:', res.data.message);

      dispatch({
        type: 'ALERT',
        payload: { success: res.data.message },
      });

      // Obtienes la data del servidor
      const responseData = res.data.data;

      await handleSendEmails(
        'ddoval@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorización para el alta del nuevo usuario con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/ddoval`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/ddoval`, // URL de Rechazo
        `${nombre}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${data.name}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
      await handleSendEmails(
        'galvarez@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorizacion para el alta del nuevo usuario con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/galvarez`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/galvarez`, // URL de Rechazo
        `${nombre}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${data.name}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
      await handleSendEmails(
        'jvillalobos@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorizacion para el alta del nuevo usuario con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/jvillalobos`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/jvillalobos`, // URL de Rechazo
        `${nombre}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${data.name}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
    } catch (error) {
      console.log('Error en la solicitud:', error.message);
    }

    clearFields();
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <DashboardCard title=" SOLICITUD DE ALTA DE USUARIO ">
      <Grid sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <form onSubmit={addEmployee}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <TextField
              fullWidth
              label="Nombre del Colaborador Peco/Externo"
              id="userName"
              sx={{ m: 1 }}
              value={data.name}
              onChange={handleChangeInput('name')}
              helperText="Escriba el nombre del nuevo colaborador."
            />
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
                <FormHelperText>Seleccione la dirección a la que será afiliado.</FormHelperText>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <Autocomplete
                  id="autocomplete-management"
                  options={management}
                  getOptionLabel={(option) => option.ger_nombre || ''}
                  value={data.management}
                  onChange={(event, newValue) => {
                    setData((prevData) => ({
                      ...prevData,
                      management: newValue || null,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Gerencia" placeholder="Escribe para buscar..." />
                  )}
                />
                <FormHelperText>Seleccione la gerencia a la que será afiliado.</FormHelperText>
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <Autocomplete
                  id="autocomplete-leadership"
                  options={leadership}
                  getOptionLabel={(option) => option.jef_nombre || ''}
                  value={data.leadership}
                  onChange={(event, newValue) => {
                    setData((prevData) => ({
                      ...prevData,
                      leadership: newValue || null,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Jefatura" placeholder="Escribe para buscar..." />
                  )}
                />
                <FormHelperText>Seleccione la jefatura a la que será afiliado.</FormHelperText>
              </FormControl>
            </Stack>

            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Fecha de inicio"
                id="startDate"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChangeInput('startDate')}
                helperText="Seleccione la fecha de inicio de contrato."
              />
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Fecha de fin"
                id="endDate"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChangeInput('endDate')}
                helperText="Seleccione la fecha de finalización de contrato."
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-email">¿Necesita Correo electrónico?</InputLabel>
                <Select
                  labelId="select-label-email"
                  id="needsEmail"
                  label="Necesita Correo electrónico"
                  value={data.needsEmail}
                  onChange={handleChangeInput('needsEmail')}
                >
                  <MenuItem value={1}>Si</MenuItem>
                  <MenuItem value={2}>No</MenuItem>
                </Select>
                <FormHelperText>Indique SI o No de acuerdo el caso.</FormHelperText>
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-pc">¿Necesita computadora?</InputLabel>
                <Select
                  labelId="select-label-pc"
                  id="needsPC"
                  label="Necesita computadora"
                  value={data.needsPC}
                  onChange={handleChangeInput('needsPC')}
                >
                  <MenuItem value={1}>Si</MenuItem>
                  <MenuItem value={2}>No</MenuItem>
                </Select>
                <FormHelperText>Indique SI o No de acuerdo el caso.</FormHelperText>
              </FormControl>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
