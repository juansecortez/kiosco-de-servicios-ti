import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import TableEarrings from './components/TableEarrings';

const Earrings = () => {
  return (
    <PageContainer description="this is Earrings page">
      <DashboardCard title="PENDIENTES POR FINALIZAR">
        <TableEarrings />
      </DashboardCard>
    </PageContainer>
  );
};

export default Earrings;
