import React, { useState } from 'react';
import {Button}   from '@mui/material';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import TablaRecursos from './components/TablaRecursos';
import CreateResourceModal from './components/CreateResourceModal';
import { fetchRecursos, addRecurso } from 'src/redux/actions/recursosActions';

const Recursos = ({ fetchRecursos, addRecurso }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleCreateRecurso = () => {
    setOpenCreateModal(true);
  }

  const handleCloseModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreate = (newResource) => {
    addRecurso(newResource)
      .then(() => fetchRecursos())
      .catch(error => {
        console.error("Failed to create resource:", error);
        // Show an error message to the user
      });
    setOpenCreateModal(false);
  };

  return (
    <PageContainer description="this is sources page">
      <DashboardCard title="MANEJO DE RECURSOS">
      <Button 
      style={{ margin: '20px 0' }} // separa el botón del resto del contenido
      variant="contained"
      color="primary" // color azul
      onClick={handleCreateRecurso}
    >
      Crear Recurso
    </Button>
        <TablaRecursos />
        <CreateResourceModal
          
          open={openCreateModal}
          onClose={handleCloseModal}
          onCreate={handleCreate}
        />
      </DashboardCard>
    </PageContainer>
  );
};

const mapDispatchToProps = {
  fetchRecursos,
  addRecurso,
};


export default connect(null, mapDispatchToProps)(Recursos);
