import React, { useState,useEffect } from 'react';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import TablaUbicaciones from './components/TablaUbicaciones';
import CreateLocationModal from './components/CreateLocationModal';
import { fetchUbicaciones,addUbicacion, fetchZonas, addZona, deleteZona } from 'src/redux/actions/zonasUbicacionActions';

const Ubicaciones = ({ fetchUbicaciones, addUbicacion, fetchZonas, addZona, deleteZona, zonas }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);


  useEffect(() => {
    fetchZonas();
}, []);

  const handleCreateUbicacion = () => {
    setOpenCreateModal(true);
  }

  const handleCloseModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreate = (newLocation) => {
    addUbicacion(newLocation)
      .then(() => fetchUbicaciones())
      .catch(error => {
        console.error("Failed to create location:", error);
        // Show an error message to the user
      });
    setOpenCreateModal(false);
  };

  return (
    <PageContainer description="this is locations page">
      <DashboardCard title="MANEJO DE UBICACIONES">
        <Button 
          style={{ margin: '20px 0' }}
          variant="contained"
          color="primary"
          onClick={handleCreateUbicacion}
        >
          Crear Ubicación / Zona
        </Button>
        <TablaUbicaciones />
        <CreateLocationModal
          open={openCreateModal}
          onClose={handleCloseModal}
          onCreate={handleCreate}
          zonas={zonas}
          addZona={addZona}
          deleteZona={deleteZona}
          fetchZonas={fetchZonas}
        />
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
      zonas: state.zonasUbicacionReducer.zonas
  };
};

const mapDispatchToProps = {
  fetchUbicaciones,
  addUbicacion,
  fetchZonas,
  addZona,
  deleteZona
};

export default connect(mapStateToProps, mapDispatchToProps)(Ubicaciones);
