import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import FormIS from './FormIS';

function ModalIS({ addData, closeModal, showModal }) {
  return (
    <Modal
      open={showModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: showModal ? 'block' : 'none' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
        }}
      >
        <DashboardCard title="Agregar Solicitud">
          <Typography>Agregar solicitud de acceso a sistemas de información.........</Typography>
          <FormIS addData={addData} closeModal={closeModal} />
        </DashboardCard>
      </Box>
    </Modal>
  );
}

export default ModalIS;
