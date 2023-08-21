import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import Form from './components/Form';

const Internet = () => {
  return (
    <PageContainer description="this is Internet Access page">
      <DashboardCard title="SOLICITUD DE ACCESO A INTERNET">
        <Form />
      </DashboardCard>
    </PageContainer>
  );
};

export default Internet;
