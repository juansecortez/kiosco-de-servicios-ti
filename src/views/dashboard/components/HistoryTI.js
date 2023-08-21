import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const products = [
  // {
  //   id: '1',
  //   key: 'k101',
  //   name: 'Lorem Ipsum',
  //   description: 'Lorem Ipsum',
  //   quantity: '1',
  //   cost: '10.9',
  // },
  // {
  //   id: '2',
  //   key: 'k102',
  //   name: 'Lorem Ipsum',
  //   description: 'Lorem Ipsum',
  //   quantity: '5',
  //   cost: '3.9',
  // },
  // {
  //   id: '3',
  //   key: 'k103',
  //   name: 'Lorem Ipsum',
  //   description: 'Lorem Ipsum',
  //   quantity: '6',
  //   cost: '3.9',
  // },
  // {
  //   id: '4',
  //   key: 'k104',
  //   name: 'Lorem Ipsum',
  //   description: 'Lorem Ipsum',
  //   quantity: '3',
  //   cost: '3.9',
  // },
  // {
  //   id: '5',
  //   key: 'k105',
  //   name: 'Lorem Ipsum',
  //   description: 'Lorem Ipsum',
  //   quantity: '9',
  //   cost: '3.9',
  // },
  // {
  //   id: '6',
  //   key: 'k106',
  //   name: 'Lorem Ipsum',
  //   description: 'Lorem Ipsum',
  //   quantity: '2',
  //   cost: '3.9',
  // },
];

const HistoryTI = () => {
  if (!products || products.length === 0) {
    return null; // No hay products o la matriz es nula, no se muestra nada
  }
  return (
    <DashboardCard title="Historial en TI">
      <Box sx={{ overflow: 'auto', maxHeight: '300px' }}>
        <Table>
          <TableHead
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              bgcolor: 'peco.main',
            }}
          >
            <TableRow>
              <TableCell sx={{ color: 'text.sidebar' }}>Clave</TableCell>
              <TableCell sx={{ color: 'text.sidebar' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'text.sidebar' }}>Descripcion</TableCell>
              <TableCell sx={{ color: 'text.sidebar', textAlign: 'center' }}>Cantidad</TableCell>
              <TableCell sx={{ color: 'text.sidebar', textAlign: 'center' }}>Costo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.key}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{product.quantity}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>${product.cost}k</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default HistoryTI;
