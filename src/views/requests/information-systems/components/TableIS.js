import React from 'react';
import {
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { IconTrash } from '@tabler/icons';

const TableIS = ({ data, setData }) => {
  const handleDelete = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: 'nowrap',
          mt: 2,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5" fontWeight={600}>
                Nombre
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" fontWeight={600}>
                Función a desarrollar
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" fontWeight={600}>
                Archivo
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                Acciones
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: '500',
                  }}
                  name="name"
                >
                  {index}
                  {item.nameIS}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                  {item.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                  {item.file}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Eliminar" onClick={() => handleDelete(index)}>
                  <Fab size="small" color="buttonDanger">
                    <IconTrash size="16" />
                  </Fab>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableIS;
