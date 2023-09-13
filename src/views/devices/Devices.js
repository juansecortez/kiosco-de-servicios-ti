import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import {
  listTables,
  listAreas,
  listUbicaciones,
  listTipos,

} from '../../redux/actions/deviceActions';

// Importaciones de Material-UI
import { Select, MenuItem, FormControl, InputLabel, makeStyles,Typography } from '@material-ui/core';
import BarChartComponent from './components/BarChartComponent'; // Asegúrate de poner la ruta correcta
import GroupedBarChartComponent from './components/GroupedBarChartComponent';
import GroupedBarChartTypeComponent from './components/GroupedBarChartTypeComponent';
import GroupedBarChartLocationComponent from './components/GroupedBarChartLocationComponent';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

const Devices = ({
  listTables,
  listAreas,
  listUbicaciones,
  listTipos,
  tables,
  areas,
  ubicaciones,
  tipos,
}) => {
  const classes = useStyles();

  const [year, setYear] = useState('');
  const [area, setArea] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    listTables();
  }, [listTables]);

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    listAreas(selectedYear);
    listTipos(selectedYear);
  };

  const handleTipoChange = (e) => {
    const selectedTipo = e.target.value;
    setTipo(selectedTipo);
    listAreas(year, selectedTipo);
  };

  const handleAreaChange = (e) => {
    const selectedArea = e.target.value;
    setArea(selectedArea);
    listUbicaciones(year, selectedArea);
  };

  const handleUbicacionChange = (e) => {
    const selectedUbicacion = e.target.value;
    setUbicacion(selectedUbicacion);
  };

  return (
    <PageContainer description="this is devices page">
      <DashboardCard title="TIEMPO EN LINEA INFRAESTRUCTURA DE RED">
      <Typography variant="h6">Filtro de dispositivos.</Typography>
        
        <FormControl className={classes.formControl}>
          <InputLabel>Año</InputLabel>
          <Select value={year} onChange={handleYearChange}>
            {tables.map((table) => (
              <MenuItem key={table} value={table}>
                {table}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Área</InputLabel>
          <Select value={area} onChange={handleAreaChange}>
            {areas.map((area) => (
              <MenuItem key={area} value={area}>
                {area}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Ubicación</InputLabel>
          <Select value={ubicacion} onChange={handleUbicacionChange}>
            {ubicaciones.map((ubi) => (
              <MenuItem key={ubi} value={ubi}>
                {ubi}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Tipo</InputLabel>
          <Select value={tipo} onChange={handleTipoChange}>
            {tipos.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DashboardCard>
<br />
<Typography variant="h6">Gráfica de dispositivos filtrados:</Typography>
<br />
      <BarChartComponent
        year={year} // antes era Year
        area={area} // antes era Area
        ubicacion={ubicacion} // antes era Ubicacion
        tipo={tipo} // antes era Tipo
        
      />
      <br />
      <br />
      <br />
<Typography variant="h6">Gráfica de rendimiento por area:</Typography>
<br />
      <GroupedBarChartComponent/>
      <br /><br />
      <br />
<Typography variant="h6">Gráfica de rendimiento por tipo:</Typography>
<br />
      <GroupedBarChartTypeComponent/>
      <br /><br />
      <br />
<Typography variant="h6">Gráfica de rendimiento por ubicación:</Typography>
<br />
      <GroupedBarChartLocationComponent/>
    </PageContainer>
  );
};

const mapStateToProps = (state) => ({
  tables: state.deviceReducer.tables,
  areas: state.deviceReducer.areas,
  ubicaciones: state.deviceReducer.ubicaciones,
  tipos: state.deviceReducer.tipos,
});

const mapDispatchToProps = {
  listTables,
  listAreas,
  listUbicaciones,
  listTipos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
