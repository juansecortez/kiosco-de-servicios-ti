import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import Form from './components/Form';

const Folders = () => {
  return (
    <PageContainer description="this is Folders Access page">
      <DashboardCard title="SOLICITUD DE ACCESO A CARPETAS">
        <Form />
      </DashboardCard>
    </PageContainer>
  );
};

export default Folders;
