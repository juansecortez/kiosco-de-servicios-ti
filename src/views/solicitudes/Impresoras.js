import React, { useState, useEffect, useRef } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  Typography,
  Paper,
} from '@material-ui/core';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';

function CopyField({ value }) {
  const inputRef = useRef(null);

  const handleCopy = () => {
    inputRef.current.select();
    document.execCommand('copy');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
      <input 
        ref={inputRef} 
        value={value} 
        readOnly 
        style={{ marginRight: '10px', padding: '5px' }} 
      />
      <button onClick={handleCopy}>Copiar</button>
    </div>
  );
}

const PrinterSelector = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [printerList, setPrinterList] = useState([]);

  const fetchPrinters = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPrinterList(data);
    } catch (error) {
      console.error('Hubo un error al obtener la lista de impresoras:', error);
    }
  };

  useEffect(() => {
    if (selectedOption === 'Mina') {
      fetchPrinters('http://vwebgama:4001/api/v1/print/list/192.168.200.10');
    } else if (selectedOption === 'Pelet') {
      fetchPrinters('http://vwebgama:4001/api/v1/print/list/192.168.100.10');
    }
  }, [selectedOption]);

  return (
    <PageContainer description="Seleccionar Impresora">
      <DashboardCard title="Conectarse a una impresora">
        <Typography variant="h6">Lea atentamente las siguientes instrucciones para realizar una conexión exitosa a cualquier impresora en la red de PECO.</Typography>
        
        <Typography variant="body1" style={{ marginTop: '15px' }}>
          Primero, debe estar al tanto de la lista de impresoras disponibles en su área. Para ello, seleccione la ubicación en la que se encuentra.
        </Typography>
        
        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px', marginBottom: '20px' }}>
          <InputLabel id="printer-label">Seleccione una ubicación</InputLabel>
          <Select
            labelId="printer-label"
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
          >
            <MenuItem value={'Mina'}>Mina</MenuItem>
            <MenuItem value={'Pelet'}>Pelet</MenuItem>
          </Select>
        </FormControl>
        
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Impresoras:
          </Typography>
          <List>
            {printerList.map(printerName => (
              <ListItem key={printerName}>{printerName}</ListItem>
            ))}
          </List>
        </Paper>

        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Instrucciones:</Typography>
          <ol>
            <li>Abra la ventana de ejecutar en Windows (Win + R).</li>
            <img src="https://hitech-us.com/wp-content/uploads/2020/04/atalho-Winkey-Logotipo-do-Windows-R.gif" alt="Combinación de teclas" style={{ width: '100%', maxWidth: '400px', display: 'block', margin: '10px auto' }} />
            <p>Encontrará una ventana de ejecución similar a esta:</p>
            <img src="https://cursoprogramador.files.wordpress.com/2012/04/011ejecutar.jpg" alt="Ejecución de Windows" style={{ width: '100%', maxWidth: '400px', display: 'block', margin: '10px auto' }} />
            <li>Copie y pegue el comando correspondiente y haga clic en 'Aceptar'.</li>
            <p>Para Pelet:</p>
            <CopyField value="\\vprinterpelet" />
            <p>Para Mina:</p>
            <CopyField value="\\vmprinter" />
            <p>Se abrirá un explorador de archivos con las impresoras disponibles.</p>
            <img src="https://www.epfl.ch/campus/services/wp-content/uploads/2018/10/windows-list-printer.png" alt="Lista de impresoras en Windows" style={{ width: '100%', maxWidth: '400px', display: 'block', margin: '10px auto' }} />
            <li>Busque la impresora a la que desea conectar y haga doble clic en ella.</li>
          </ol>
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default PrinterSelector;
