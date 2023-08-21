import React from 'react';
import DashboardCard from 'src/components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';

// components

import RequestsForAuth from './components/RequestsForAuth';

const ProfilePage = () => {
    return (
        <PageContainer description="this is ProfilePage">


            <DashboardCard title="PENDIENTES POR APROBAR">
                <RequestsForAuth />
            </DashboardCard>



        </PageContainer>
    );
};

export default ProfilePage;
