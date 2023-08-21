import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import Form from './components/Form';

const DatabaseA = () => {
  return (
    <PageContainer description="this is Database Access page">
      <DashboardCard title="SOLICITUD DE ACCESO A UNA BASE DE DATOS">
        <Form />
      </DashboardCard>
    </PageContainer>
  );
};

export default DatabaseA;
