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
  const Jerarquia = localStorage.getItem('tipo');
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
    const fetchedResources = await fetchSubResources(event.target.value,Jerarquia);
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
      !data.quantity ||
      !data.description
    ) {
      setOpen(true);
      return;
    }
    function getTipoFromSelectedSubResource(subResource) {
      // Usamos una expresión regular para buscar "Tipo:1" o "Tipo:2" en el string
      const match = subResource.match(/Tipo:(\d+)/);
      if (match && match[1]) {
          return parseInt(match[1], 10);
      }
      return null;
  }
  const tipoFromSubResource = getTipoFromSelectedSubResource(selectedSubResource);

  const tipoIdValue = tipoFromSubResource === 1 ? 7 : (tipoFromSubResource === 2 ? 3 : 3); // Si no es ni 1 ni 2, por defecto será 3
    

    const dataToSend = {
      tipo_id: tipoIdValue,
      sol_usuarioidSolicitante: auth || null,
      recu_direccion: data.direction || null,
     
    recu_gerencia: data.management?.ger_nombre || null,  // Modificado aquí
      recu_jefatura: data.leadership?.jef_nombre || null, 
      recu_solicitante: data.applicant || null,
      recu_justificacion: data.justification || null,
      recu_tipoRecursoInfo: data.type || null,
      recu_cantidad: data.quantity || null,
      recu_descripcion: data.description || null,
      recu_recu:selectedSubResource,
     
    };

    const emailRecipientsData = [
      {
        email: 'galvarez@pcolorada.com',
        authorizeUrlEnd: 'galvarez',
        rejectUrlEnd: 'galvarez'
      },
      {
        email: 'ddoval@pcolorada.com',
        authorizeUrlEnd: 'ddoval',
        rejectUrlEnd: 'ddoval'
      },
      {
        email: 'jtorres@pcolorada.com',
        authorizeUrlEnd: 'jtorres',
        rejectUrlEnd: 'jtorres'
      },
      {
        email: 'atronco@pcolorada.com',
        authorizeUrlEnd: 'atronco',
        rejectUrlEnd: 'atronco'
      }
    ];
    
    const tipo = getTipoFromSelectedSubResource(selectedSubResource);
    
    let selectedRecipients = [];
    
    if (tipo === 1) {
        selectedRecipients = [emailRecipientsData[2],emailRecipientsData[3]]; // Solo Guillermo
    } else if (tipo === 2) {
        selectedRecipients = emailRecipientsData; // Todos los destinatarios
    } else {
        selectedRecipients = [emailRecipientsData]; // juans.suarez@usantoto.edu.co
    }
    
    try {
        const res = await postAPI('make/accessResource', dataToSend);
        dispatch({
            type: 'ALERT',
            payload: { success: res.data.message },
        });
    
        for (const recipient of selectedRecipients) {
          const responseData = res.data.data;
          await handleSendEmails(
            recipient.email,
            '',
            `NUEVA SOLICITUD DE`,
            'Se solicita la autorización para entrega de un recuso informatico con nombre:',
            `https://autorizaitk.pcolorada.com/api/v1/request/authorize/${responseData}/${recipient.authorizeUrlEnd}`, // URL de Aceptación
            `https://autorizaitk.pcolorada.com/api/v1/request/reject/${responseData}/${recipient.rejectUrlEnd}`, // URL de Rechazo
            `${data.applicant}`,
            `${selectedSubResource}`
          );
        }
    
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
                  <MenuItem value={1}>Software</MenuItem>
                  <MenuItem value={2}>Hardware</MenuItem>
                  
                </Select>
                <FormHelperText>Seleccione el tipo de recurso que necesita.</FormHelperText>
                <FormHelperText>Tipo 1 : De alto nivel</FormHelperText>
                <FormHelperText>Tipo 2 : Normal</FormHelperText>
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
              helperText="Seleccione el recurso que necesita (en la ventana emergente)."
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
  fetchSubResources: (tipo_id, Jerarquia) => dispatch(fetchSubResources(tipo_id, Jerarquia)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

