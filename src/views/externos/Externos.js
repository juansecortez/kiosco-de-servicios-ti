import React, { useState, useEffect  } from 'react';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import TablaExternos from './components/TablaExternos';
import CreateExternoModal from './components/CreateExternoModal';
import { fetchExternos, addExterno } from 'src/redux/actions/externosActions';

const Externos = ({ fetchExternos, addExterno, externos  }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
 
  const uniqueCompanies = [...new Set(externos && externos.map((item) => item.EMPRESA))];

  const handleCreateRecurso = () => {
    setOpenCreateModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateModal(false);
  };
  useEffect(() => {
    fetchExternos();
  }, [fetchExternos]);


  const handleCreate = (newExterno) => {
    addExterno(newExterno)
      .then(() => fetchExternos())
      .catch((error) => {
        console.error('Failed to create externo:', error);
        // Show an error message to the user
      });
    setOpenCreateModal(false);
  };

  return (
    <PageContainer description="this is externals page">
      <DashboardCard title="MANEJO DE EXTERNOS">
        <Button
          style={{ margin: '20px 0' }} // separa el botón del resto del contenido
          variant="contained"
          color="primary" // color azul
          onClick={handleCreateRecurso}
        >
          Crear Externo
        </Button>
        <TablaExternos />
        <CreateExternoModal
          open={openCreateModal}
          onClose={handleCloseModal}
          onCreate={handleCreate}
          companies={uniqueCompanies}
        />
      </DashboardCard>
    </PageContainer>
  );
};

const mapDispatchToProps = {
  fetchExternos,
  addExterno,
};

const mapStateToProps = (state) => ({
  externos: state.externosReducer.externos, // Asumiendo que tu reducer está bajo la clave 'externosReducer' en tu store
});

export default connect(mapStateToProps, mapDispatchToProps)(Externos);

