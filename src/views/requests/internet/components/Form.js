import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch} from 'react-redux'; // Importa el dispatch desde react-redux
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
import { connect } from 'react-redux';
import {
  fetchDirections,
  fetchManagement,
  fetchLeadership,
  fetchInternetTypes,
} from '../../../../redux/actions/selectsActions';
import CustomDialog from 'src/components/shared/CustomDialog';
import { postaPI, postAPI } from 'src/utils/FetchData';

const initialState = {
  direction: '',
  management: '',
  leadership: '',
  applicant: '',
  justification: '',
  type: '',
  description: '',
};

const Form = ({
  directions,
  management,
  leadership,
  internet,
  fetchDirections,
  fetchManagement,
  fetchLeadership,
  fetchInternetTypes,
}) => {
  const user = localStorage.getItem('userId');
  const [data, setData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  

  useEffect(() => {
    fetchDirections();
    fetchManagement();
    fetchLeadership();
    fetchInternetTypes();
  }, []);

  const handleChangeInput = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const clearFields = () => {
    setData(initialState);
  };

  const handleSendEmails = async (to, cc, title, txt, urlAceptacion, urlRechazo, solicitante, solicitud) => {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    await postaPI(
      "mail/sendemail1",
      {
        to,
        cc,
        title,
        txt,
        urlAceptacion,
        urlRechazo,
        solicitante,
        solicitud
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
      !data.description
    ) {
      setOpen(true);
      return;
    }

    const dataToSend = {
      tipo_id: 6,
      sol_usuarioidSolicitante: user || null,
      int_direccion: data.direction || null,
  
      int_gerencia: data.management?.ger_nombre || null,  // Modificado aquí
      int_jefatura: data.leadership?.jef_nombre || null, 
      int_solicitante: data.applicant || null,
      int_justificacion: data.justification || null,
      int_tipoInternet: data.type || null,
      int_descripcion: data.description || null,
    };

    try {
      const response = await postAPI('make/internetAccess', dataToSend);
      
      dispatch({
        // Usa el dispatch para enviar la acción
        type: 'ALERT',
        payload: { success: response.data.message },
      });

      const responseData = response.data.data;
      await handleSendEmails(
        'galvarez@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorización para el acceso a la red de datos con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/galvarez`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/galvarez`, // URL de Rechazo
        `${data.applicant}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${data.type}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
      await handleSendEmails(
        'ddoval@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorización para el acceso a la red de datos con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/ddoval`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/ddoval`, // URL de Rechazo
        `${data.applicant}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${data.type}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
      await handleSendEmails(
        'jvillalobos@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorización para el acceso a la red de datos con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/jvillalobos`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/jvillalobos`, // URL de Rechazo
        `${data.applicant}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${data.type}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
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
    <>
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
                id="outlined-multiline-static"
                label="Justificación"
                multiline
                rows={5}
                value={data.justification || ''}
                onChange={handleChangeInput('justification')}
                helperText="Explique por que necesita conexión a internet."
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-type">Internet</InputLabel>
                <Select
                  labelId="select-label-type"
                  id="type"
                  label="Tipo de carpeta"
                  value={data.type || ''}
                  onChange={handleChangeInput('type')}
                >
                  {internet.map((internt) => (
                    <MenuItem key={internt.inte_id} value={internt.inte_nombre}>
                      {internt.inte_nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione la red a la que necesita conectarse.</FormHelperText>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="outlined-multiline-static"
                label="Descripción"
                multiline
                rows={2}
                value={data.description || ''}
                onChange={handleChangeInput('description')}
                helperText="Cuentenos mas sobre su solicitud."
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
    </>
  );
};

const mapStateToProps = (state) => ({
  directions: state.selects.directions,
  management: state.selects.management,
  leadership: state.selects.leadership,
  internet: state.selects.internet,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDirections: () => dispatch(fetchDirections()),
  fetchManagement: () => dispatch(fetchManagement()),
  fetchLeadership: () => dispatch(fetchLeadership()),
  fetchInternetTypes: () => dispatch(fetchInternetTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
