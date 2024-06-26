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
  fetchDatabaseTypes,
  fetchDataBases
} from '../../../../redux/actions/selectsActions';
import CustomDialog from 'src/components/shared/CustomDialog';
import { postaPI, postAPI } from 'src/utils/FetchData';
import DbModal from './dbModal';

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
  databases,
  fetchDirections,
  fetchManagement,
  fetchLeadership,
  fetchDatabaseTypes,
  fetchDataBases
}) => {
  const [selectedDatabase, setSelectedDataBase] = useState('');
  const [dataBases, setDataBases] = useState([]);
  const [openDbModal, setOpenDbModa] = useState(false);
  const user = localStorage.getItem('userId');
 
  const [data, setData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
 

  useEffect(() => {
    fetchDirections();
    fetchManagement();
    fetchLeadership();
    fetchDatabaseTypes();
  }, []);

  const handleOpenModal = (bd) => {
    setSelectedDataBase(bd);
    setOpenDbModa(true);
  };
  const handleResourceChange = async (event) => {
    const fetchedBd = await fetchDataBases(event.target.value);
    setDataBases(fetchedBd);
    handleOpenModal();
    setData(prevData => ({ ...prevData, type: event.target.value }));
  };
  

  const handleList = async (bd) => {
    setSelectedDataBase(bd.DatabaseName); 
    setOpenDbModa(false);
  };
  const handleCloseModal = () => {
    setOpenDbModa(false);
  };

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

    if (!data.direction || !data.management || !data.leadership || !data.applicant) {
      setOpen(true);
      return;
    }

    const dataToSend = {
      tipo_id: 5,
      sol_usuarioidSolicitante: user || null,
      bd_direccion: data.direction || null,
      bd_gerencia: data.management?.ger_nombre || null,  // Modificado aquí
      bd_jefatura: data.leadership?.jef_nombre || null, 
      bd_solicitante: data.applicant || null,
      bd_justificacion: data.justification || null,
      bd_tipoBaseDatos: data.type || null,
      bd_bd : selectedDatabase,
      bd_descripcion: data.description || null,
    };

    try {
      const response = await postAPI('make/accessDatabase', dataToSend);
      
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
        'Se solicita la autorización para el acceso a la base de datos con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/galvarez`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/galvarez`, // URL de Rechazo
        `${data.applicant}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${selectedDatabase}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
      );
      await handleSendEmails(
        'gquiteno@pcolorada.com',
        '',
        `NUEVA SOLICITUD DE`,
        'Se solicita la autorización para el acceso a la base de datos con nombre:',
        `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/gquiteno`, // URL de Aceptación
        `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/gquiteno`, // URL de Rechazo
        `${data.applicant}`, // Puedes reemplazar esto con la variable que tenga el nombre del solicitante
        `${selectedDatabase}`, // Un ejemplo simple que utiliza responseData. Modifica según tus necesidades
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
                <FormHelperText>Seleccione la direccion a la que pertenece.</FormHelperText>
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
                helperText="Explique por que necesita el acceso a la base de datos."
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-type">Servidor</InputLabel>
                <Select
                  labelId="select-label-type"
                  id="type"
                  label="Servidor"
                  value={data.type}
                  onChange={handleResourceChange}
                >
                  <MenuItem value={'DBDELTA'}>Servidor Admin Mina</MenuItem>
                  <MenuItem value={'DBGAMA'}>Servidor Admin Pelet</MenuItem>
                  <MenuItem value={'DBMINAS'}>Servidor Operación Mina </MenuItem>
                </Select>
                <FormHelperText>
                  Seleccione el servidor al que necesita acceder.
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            ></Stack>

            <TextField
              fullWidth
              label="Base de datos seleccionada"
              id="subresource"
              sx={{ m: 1 }}
              value={selectedDatabase}
              disabled // Hace que el campo sea de solo lectura.
              helperText="Seleccione la base de datos que necesita."
            />
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
      <DbModal
       open={openDbModal}
       onClose={handleCloseModal}
       recurso={selectedDatabase}
       onList={handleList}
       dataBases={dataBases} // pasa los recursos como una propiedad
      />      
    </>
  );
};

const mapStateToProps = (state) => ({
  directions: state.selects.directions,
  management: state.selects.management,
  leadership: state.selects.leadership,
  databases: state.selects.databases,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDirections: () => dispatch(fetchDirections()),
  fetchManagement: () => dispatch(fetchManagement()),
  fetchLeadership: () => dispatch(fetchLeadership()),
  fetchDatabaseTypes: () => dispatch(fetchDatabaseTypes()),
  fetchDataBases: (cadena) => dispatch(fetchDataBases(cadena)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
