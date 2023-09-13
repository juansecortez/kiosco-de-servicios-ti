import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';

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
import { fetchZonas, fetchUbicacionesByZona } from 'src/redux/actions/zonasUbicacionActions';
import { fetchIssuesByType } from 'src/redux/actions/issueActions';
import { agregarImagen } from 'src/redux/actions/solicitudActions';

const initialState = {
  leadership: null,
  zona: null,
};

const FormularioSolicitud = ({
  leadership,
  fetchLeadership,
  zonas,
  fetchZonas,

  issues,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(initialState);
  const ID_Usuario = localStorage.getItem('userId');
  const Jerarquia = localStorage.getItem('tipo'); // Asegúrate de que este valor esté correctamente almacenado en localStorage
  const [Descripcion, setDescripcion] = useState('');
  const [Tipo, setTipo] = useState('');
  const [Ubicacion, setUbicacion] = useState('');
  const [ubicacionesByZona, setUbicacionesByZona] = useState([]);
  const [SelectedIssue, setSelectedIssue] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchLeadership();
    fetchZonas();
  }, []);

  useEffect(() => {
    if (Tipo) {
      dispatch(fetchIssuesByType(Tipo));
    }
  }, [Tipo]);

  const clearFields = () => {
    setData(initialState);
    setDescripcion(''); // Limpia el campo Descripcion
    setTipo(''); // Limpia el campo Tipo
    setUbicacion(''); // Limpia el campo Ubicacion
    setUbicacionesByZona([]); // Limpia las ubicaciones asociadas a una zona
    setSelectedIssue(null); // Limpia el campo Issue
    setSelectedFile(null); // Limpia el input de imagen
  };

  const tipos = ['Incidente', 'Requerimiento'];
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('ID_Usuario', ID_Usuario);
    formData.append('Tipo', Tipo);formData.append('Jefatura', data.leadership ? data.leadership.jef_nombre : null);

    formData.append('Ubicacion', Ubicacion);
 

    formData.append('Jerarquia', Jerarquia);
    formData.append('Descripcion', Descripcion);

    // Espera a que la solicitud se haya creado
    const response = await dispatch(crearSolicitud('solicitud/crearSolicitud', formData));
    const updatedID_Servicio = response.ID_Servicio;

    formData.append('ID_Servicio', updatedID_Servicio);

    if (selectedFile) {
      formData.append('imagen', selectedFile);
      await dispatch(
        agregarImagen('solicitud/subirImagen', selectedFile, updatedID_Servicio, null, null),
      );
    }

    clearFields();
  };

  return (
    <DashboardCard title="SOLICITUD DE SERVICIO TÉCNICO">
      <Grid sx={{ display: 'flex', flexWrap: 'wrap', p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Stack direction="row" sx={{ gap: 2, width: '100%' }}>
              <FormControl fullWidth>
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
                <FormHelperText>
                  Seleccione el tipo de reporte para el que solicita el servicio técnico. <br></br>{' '}
                  Incidentes = Fallas <br></br>Requerimientos = Necesidades.
                </FormHelperText>
                <br></br>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="select-label-issue"></InputLabel>

                <Autocomplete
                  id="combo-box-issue"
                  options={issues}
                  getOptionLabel={(option) => option.nombreConTipo || ' '}
                  value={SelectedIssue}
                  onChange={(event, newValue) => {
                    setData((prevData) => ({
                      ...prevData,
                      leadership: newValue, // aquí almacenamos todo el objeto
                    }));
                  }}
                  renderInput={(params) => <TextField {...params} label="Issue" />}
                />
              </FormControl>
            </Stack>

            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth>
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
              <FormControl fullWidth>
                <Autocomplete
                  id="combo-box-zona"
                  options={zonas}
                  getOptionLabel={(option) => option.Nombre || ''}
                  value={data.zona} // Usar el objeto completo como valor
                  onChange={(event, newValue) => {
                    setData((prevData) => ({
                      ...prevData,
                      zona: newValue || null, // Guardar el objeto completo
                    }));

                    // Lógica para cargar las ubicaciones relacionadas con la Zona seleccionada
                    if (newValue) {
                      dispatch(fetchUbicacionesByZona(newValue.Nombre)).then((ubicaciones) => {
                        console.log('Ubicaciones obtenidas:', ubicaciones);
                        setUbicacionesByZona(ubicaciones);
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Zona" placeholder="Escribe para buscar..." />
                  )}
                />
                <FormHelperText>
                  Seleccione la zona específica donde se encuentre la solicitud.
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth>
                <InputLabel id="select-label-ubicacion">Ubicación</InputLabel>
                <Select
                  labelId="select-label-ubicacion"
                  id="ubicacion"
                  label="Ubicación"
                  value={Ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                >
                  {ubicacionesByZona &&
                    ubicacionesByZona.map((ubicacion) => (
                      <MenuItem key={ubicacion.ID} value={ubicacion.UbicacionConZona}>
                        {ubicacion.UbicacionConZona}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                  Seleccione la ubicación específica donde se encuentra la solicitud.
                </FormHelperText>
                <br></br>
              </FormControl>
            </Stack>
            <Stack direction="row" sx={{ gap: 2, width: '100%' }}>
              <TextField
                label="Descripción"
                value={Descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                multiline
                rows={6} // Aumenta la altura inicial del TextField
                helperText="Explique detalladamente todo lo relacionado a su solicitúd, más información facilita la pronta resolución de su caso."
                fullWidth
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <FormControl fullWidth>
                <br></br>
                <input type="file" onChange={(e) => handleFileChange(e)} />
                <br></br>
                <FormHelperText>
                  Seleccione una imagen para adjuntar a su solicitud (solo si es necesario).
                </FormHelperText>
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
    </DashboardCard>
  );
};
const mapStateToProps = (state) => ({
  leadership: state.selects.leadership,
  zonas: state.zonasUbicacionReducer.zonas,
  issues: state.issueReducer.issues, // Agregamos esta línea
});

const mapDispatchToProps = (dispatch) => ({
  fetchLeadership: () => dispatch(fetchLeadership()),
  fetchZonas: () => dispatch(fetchZonas()),
  fetchUbicacionesByZona: (zona) => dispatch(fetchUbicacionesByZona(zona)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormularioSolicitud);
