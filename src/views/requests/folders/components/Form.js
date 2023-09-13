import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
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
import CustomDialog from 'src/components/shared/CustomDialog';
import { connect } from 'react-redux';
import {
  fetchDirections,
  fetchManagement,
  fetchLeadership,
  fetchFolderTypes,
} from '../../../../redux/actions/selectsActions';
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
  folders,
  fetchDirections,
  fetchManagement,
  fetchLeadership,
  fetchFolderTypes,
}) => {
  const user = localStorage.getItem('userId');
  const [data, setData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    fetchDirections();
    fetchManagement();
    fetchLeadership();
    fetchFolderTypes();
  }, []);

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
      data.direction === '' ||
      data.management === '' ||
      data.leadership === '' ||
      data.applicant === '' ||
      data.justification === '' ||
      data.type === '' ||
      data.description === ''
    ) {
      setOpen(true);
      return;
    }

    const dataToSend = {
      tipo_id: 4,
      sol_usuarioidSolicitante: user || null,
      carp_direccion: data.direction || null,
      carp_gerencia: data.management?.ger_nombre || null,  // Modificado aquí
      carp_jefatura: data.leadership?.jef_nombre || null, 
      carp_solicitante: data.applicant || null,
      carp_justificacion: data.justification || null,
      carp_tipoCarpeta: data.type || null,
      carp_descripcion: data.description || null,
    };

    try {
      const res = await postAPI('make/accessFolder', dataToSend);
      dispatch({
        // Usa el dispatch para enviar la acción
        type: 'ALERT',
        payload: { success: res.data.message },
      });
      await handleSendEmails(
        'galvarez@pcolorada.com',
        'ddoval@pcolorada.com,jvillalobos@pcolorada.com,gquiteno@pcolorada.com',
        'NUEVA SOLICITUD',
        'Tienes una nueva solicitud  pendiente por aprobar, por favor dirigete al sistema Kiosco TI ingresando al siguiente link:',
        'http://vwebgama:4002')
    } catch (err) {
      console.log(err);
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
                helperText="Explique por que necesita el acceso a la carpeta."
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-type">Tipo de carpeta</InputLabel>
                <Select
                  labelId="select-label-type"
                  id="type"
                  label="Tipo de carpeta"
                  value={data.type || ''}
                  onChange={handleChangeInput('type')}
                >
                  {folders.map((carpeta) => (
                    <MenuItem key={carpeta.carpe_id} value={carpeta.carpe_nombre}>
                      {carpeta.carpe_nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione la carpeta a la que necesita acceder.</FormHelperText>
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
  folders: state.selects.folders,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDirections: () => dispatch(fetchDirections()),
  fetchManagement: () => dispatch(fetchManagement()),
  fetchLeadership: () => dispatch(fetchLeadership()),
  fetchFolderTypes: () => dispatch(fetchFolderTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
