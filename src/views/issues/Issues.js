import React, { useState } from 'react';
import {Button} from '@mui/material';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import TablaIssues from './components/TablaIssues';
import CreateIssueModal from './components/CreateIssueModal';
import { fetchIssues, addIssue } from '../../redux/actions/issueActions';

const Issues = ({ fetchIssues, addIssue }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleCreateIssue = () => {
    setOpenCreateModal(true);
  }

  const handleCloseModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreate = (newIssue) => {
    addIssue(newIssue)
      .then(() => fetchIssues())
      .catch(error => {
        console.error("Failed to create issue:", error);
        // Show an error message to the user
      });
    setOpenCreateModal(false);
  };

  return (
    <PageContainer description="this is issues page">
      <DashboardCard title="MANEJO DE ISSUES">
        <Button 
          style={{ margin: '20px 0' }}
          variant="contained"
          color="primary"
          onClick={handleCreateIssue}
        >
          Crear Issue
        </Button>
        <TablaIssues />
        <CreateIssueModal
          open={openCreateModal}
          onClose={handleCloseModal}
          onCreate={handleCreate}
        />
      </DashboardCard>
    </PageContainer>
  );
};

const mapDispatchToProps = {
  fetchIssues,
  addIssue,
};

export default connect(null, mapDispatchToProps)(Issues);
