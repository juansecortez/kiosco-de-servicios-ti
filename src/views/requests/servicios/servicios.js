import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
  FormHelperText,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DashboardCard from 'src/components/shared/DashboardCard';
import { crearSolicitud } from 'src/redux/actions/solicitudActions';
import { fetchLeadership } from '../../../redux/actions/selectsActions';
const initialState = {
  leadership: '',
};

const FormularioSolicitud = ({ leadership,fetchLeadership }) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(initialState);
  const ID_Usuario = localStorage.getItem('userId');
  const Jerarquia = localStorage.getItem('tipo'); // Asegúrate de que este valor esté correctamente almacenado en localStorage
  const [Descripcion, setDescripcion] = useState('');
  const [Tipo, setTipo] = useState('');
  const [Ubicacion, setUbicacion] = useState('');

  useEffect(() => {
    fetchLeadership();
  }, []);
  const clearFields = () => {
    setData(initialState);
  };
  const handleChangeInput = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  const tipos = ['Incidente', 'Requerimiento'];

  const handleSubmit = (event) => {
    event.preventDefault(); // Esto evitará que la página se recargue
    const solicitud = {
      ID_Usuario,
      Tipo,
      Ubicacion,
      Jefatura: data.leadership, 
      Jerarquia,
      Descripcion,
    };
  
    dispatch(crearSolicitud('solicitud/crearSolicitud', solicitud)); 
  };

  return (
    <DashboardCard title="SOLICITUD DE SERVICIO TÉCNICO">
      <Grid sx={{ displey: 'flex', flexWrap: 'wrap' }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label-tipo">Tipo</InputLabel>
                <Select
                  labelId="select-label-tipo"
                  value={Tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  {tipos.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
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
                label="Ubicación"
                value={Ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                fullWidth
                helperText="Explique con que fin requiere el acceso al sistema."
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <TextField
          label="Descripción"
          value={Descripcion}
          onChange={e => setDescripcion(e.target.value)}
          multiline
          helperText="Explique con que fin requiere el acceso al sistema."
          fullWidth
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
    </DashboardCard>
  );
};
const mapStateToProps = (state) => ({
  leadership: state.selects.leadership,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLeadership: () => dispatch(fetchLeadership()),
});
export default connect(mapStateToProps, mapDispatchToProps)(FormularioSolicitud);
