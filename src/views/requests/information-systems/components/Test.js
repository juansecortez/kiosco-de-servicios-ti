import React, { useEffect } from 'react';

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
import DashboardCard from 'src/components/shared/DashboardCard';
import CustomDialog from 'src/components/shared/CustomDialog';
import { connect } from 'react-redux';
import {
  fetchDirections,
  fetchManagement,
  fetchLeadership,
  fetchInformationSystems,
} from '../../../../redux/actions/selectsActions';
import { postaPI, postAPI } from 'src/utils/FetchData';

const initialState = {
  direction: '',
  management: '',
  leadership: '',
  name: null,
  service: '',
};

const Test = ({
  directions,
  management,
  leadership,
  informationSystems,
  fetchDirections,
  fetchManagement,
  fetchLeadership,
  fetchInformationSystems,
}) => {
  const user = localStorage.getItem('userId');
  const [data, setData] = React.useState(initialState);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    fetchDirections();
    fetchManagement();
    fetchLeadership();
    fetchInformationSystems();
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.direction || !data.management || !data.leadership || !data.name || !data.service) {
      setOpen(true);
      return;
    }

    const dataToSend = {
      tipo_id: 2,
      sol_usuarioidSolicitante: user || null,
      sis_direccion: data.direction || null,
      sis_gerencia: data.management || null,
      sis_jefatura: data.leadership || null,
      sis_nombreSistema: data.name || null,
      sis_funcionDesarrollar: data.service || null,
    };

    try {
      const res = await postAPI('make/accessSystems', dataToSend);
      if (res.data.name) {
        dispatch({
          // Usa el dispatch para enviar la acción
          type: 'ALERT',
          payload: { success: res.data.message },
        });
      }
      await handleSendEmails(
        'galvarez@pcolorada.com',
        'ddoval@pcolorada.com,jvillalobos@pcolorada.com,gquiteno@pcolorada.com',
        'NUEVA SOLICITUD',
        'Tienes una nueva solicitud  pendiente por aprobar, por favor dirigete al sistema Kiosco TI ingresando al siguiente link:',
        'http://vwebgama:4002')
    } catch {
      console.log('Error al crear la solicitud');
    }

    console.log(data);
    clearFields();
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <DashboardCard title="SOLICITUD DE ACCESO A SISTEMAS DE INFORMACIÓN">
      <Grid sx={{ displey: 'flex', flexWrap: 'wrap' }}>
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
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-name">Sistema</InputLabel>
                <Select
                  labelId="select-label-name"
                  id="name"
                  label="Sistema"
                  value={data.name || ''}
                  onChange={handleChangeInput('name')}
                >
                  {informationSystems.map((systems) => (
                    <MenuItem key={systems.sist_id} value={systems.sist_nombre}>
                      {systems.sist_nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione el sistema al que desea acceder.</FormHelperText>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Función a desarrollar"
                id="service"
                multiline
                rows={5}
                value={data.service || ''}
                onChange={handleChangeInput('service')}
                helperText="Explique con que fin requiere el acceso al sistema."
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
    </DashboardCard>
  );
};

const mapStateToProps = (state) => ({
  directions: state.selects.directions,
  management: state.selects.management,
  leadership: state.selects.leadership,
  informationSystems: state.selects.informationSystems,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDirections: () => dispatch(fetchDirections()),
  fetchManagement: () => dispatch(fetchManagement()),
  fetchLeadership: () => dispatch(fetchLeadership()),
  fetchInformationSystems: () => dispatch(fetchInformationSystems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
