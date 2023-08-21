import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import ModalIS from './ModalIS';
import TableIS from './TableIS';

const FormFull = ({ extractData }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addData = (newData) => {
    setData([...data, newData]);
    data.push(newData);
    extractData(data);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Stack direction="row" sx={{ direction: 'rtl' }}>
        <Button variant="contained" color="buttonPrimary" sx={{ mt: 2 }} onClick={openModal}>
          Agregar
        </Button>
      </Stack>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        {/* table */}
        <TableIS data={data} setData={setData} />
      </Box>

      {/* Modal */}
      <ModalIS addData={addData} closeModal={closeModal} showModal={showModal} />
    </>
  );
};

export default FormFull;
