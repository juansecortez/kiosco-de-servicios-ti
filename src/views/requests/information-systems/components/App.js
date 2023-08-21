import React, { useState } from 'react';
import { Button, Divider, Stack } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import FormFull from './FormFull';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const App = () => {
  const [formData, setFormData] = useState({});

  const handleFormData = (data) => {
    setFormData(data);
    console.log(formData);
  };

  return (
    <DashboardCard title="Acceso a sistemas de información">
      <Divider />
      <FormFull data={formData} setData={setFormData} extractData={handleFormData} />
      <Stack direction="row" spacing={2} padding={1}>
        <Button variant="contained" color="buttonDanger" startIcon={<DeleteIcon />}>
          Borrar
        </Button>
        <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleFormData}>
          Enviar
        </Button>
      </Stack>
    </DashboardCard>
  );
};

export default App;
