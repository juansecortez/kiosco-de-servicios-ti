import React, { useState } from 'react';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import TablaUbicaciones from './components/TablaUbicaciones';
import CreateLocationModal from './components/CreateLocationModal';
import { fetchUbicaciones,addUbicacion } from 'src/redux/actions/zonasUbicacionActions';

const Ubicaciones = ({ fetchUbicaciones, addUbicacion }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

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
          Crear Ubicación
        </Button>
        <TablaUbicaciones />
        <CreateLocationModal
          open={openCreateModal}
          onClose={handleCloseModal}
          onCreate={handleCreate}
        />
      </DashboardCard>
    </PageContainer>
  );
};

const mapDispatchToProps = {
  fetchUbicaciones,
  addUbicacion,
};

export default connect(null, mapDispatchToProps)(Ubicaciones);
