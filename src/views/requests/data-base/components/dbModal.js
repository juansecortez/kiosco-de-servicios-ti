import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

const DbModal = ({ open, onClose, onList, dataBases }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePick = (bd) => {
    onList(bd);
    onClose();
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);  // reset page to 1 when search changes
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredResources = dataBases.filter((bd) =>
  bd.DatabaseName.toLowerCase().includes(search.toLowerCase())
  );

  // slice resources for current page
  const resourcesToShow = filteredResources.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Paper elevation={3}>
          <TextField
            label="Buscar"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            fullWidth
          />
          <Box
            sx={{
              maxHeight: 400,
              overflow: 'auto',
            }}
          >
            <List>
              {resourcesToShow.map((bd, index) => (
                <ListItem key={index}>
                  <ButtonBase onClick={() => handlePick(bd)}>
                    <ListItemText primary={bd.DatabaseName} />
                  </ButtonBase>
                </ListItem>
              ))}
            </List>
          </Box>
          <Pagination 
            count={Math.ceil(filteredResources.length / itemsPerPage)} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Paper>
      </Box>
    </Modal>
  );
};

export default DbModal;
