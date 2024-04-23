import React, { useEffect } from 'react';
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
  const nombre = localStorage.getItem('nombre');
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

      sis_gerencia: data.management?.ger_nombre || null,  // Modificado aquí
      sis_jefatura: data.leadership?.jef_nombre || null, 
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
      const responseData = res.data.data;
      await handleSendEmails(
        'galvarez@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorización para el acceso al sistema de informacion con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/galvarez`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/galvarez`, // URL de Rechazo
        `${nombre}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${data.name}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
      await handleSendEmails(
        'ddoval@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorización para el acceso al sistema de informacion con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/ddoval`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/ddoval`, // URL de Rechazo
        `${nombre}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${data.name}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
      await handleSendEmails(
        'jvillalobos@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorización para el acceso al sistema de informacion con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/jvillalobos`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/jvillalobos`, // URL de Rechazo
        `${nombre}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${data.name}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
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
