import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const CreateExternoModal = ({ open, onClose, onCreate,companies }) => {
  const [empresa, setEmpresa] = useState('');
  const [nombres, setNombres] = useState('');
  const [macWifi, setMacWifi] = useState('');
  const [dateAntivirus, setDateAntivirus] = useState('');
  const [contratoConfidencialidad, setContratoConfidencialidad] = useState('X');
  const [areaPeco, setAreaPeco] = useState('');
  const [correo, setCorreo] = useState('X');
  const [userAD, setUserAD] = useState('X');
  const [o365, setO365] = useState('X');
  const [teams, setTeams] = useState('X');
  const [vpn, setVpn] = useState('X');
  const [red, setRed] = useState('');
  const [endpoint, setEndpoint] = useState('X');
  const [datePedido, setDatePedido] = useState('');

  const handleSave = () => {
    onCreate({
      EMPRESA: empresa,
      NOMBRES: nombres,
      MAC_WIFI: macWifi,
      DATE_ANTIVIRUS: dateAntivirus,
      DATE_PEDIDO: datePedido,
      CONTRATO_CONFIDENCIALIDAD: contratoConfidencialidad,
      AREA_PECO: areaPeco,
      CORREO: correo,
      USER_AD: userAD,
      O365: o365,
      TEAMS: teams,
      VPN: vpn,
      RED: red,
      ENDPOINT: endpoint,
    });
    onClose();
    resetFields();
  };

  // También resetea los campos cuando se cierra el modal sin guardar
  const handleCancel = () => {
    onClose();
    resetFields();
  };

  const resetFields = () => {
    setEmpresa('');
    setNombres('');
    setMacWifi('');
    setDateAntivirus('');
    setContratoConfidencialidad('X');
    setAreaPeco('');
    setCorreo('X');
    setUserAD('X');
    setO365('X');
    setTeams('X');
    setVpn('X');
    setRed('');
    setEndpoint('X');
    setDatePedido('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear Externo</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel id="empresa-label">Empresa</InputLabel>
          <Select
            labelId="empresa-label"
            id="empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
          >
            {companies.map((comp, index) => (
              <MenuItem key={index} value={comp}>
                {comp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          id="nombres"
          label="Nombres"
          type="text"
          fullWidth
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
        <TextField
          margin="dense"
          id="macWifi"
          label="MAC WiFi"
          type="text"
          fullWidth
          value={macWifi}
          onChange={(e) => setMacWifi(e.target.value)}
        />
        <TextField
          margin="dense"
          id="dateAntivirus"
          label="Fecha Antivirus"
          type="date"
          fullWidth
          value={dateAntivirus}
          onChange={(e) => setDateAntivirus(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          id="datePedido"
          label="Fecha Pedido"
          type="date"
          fullWidth
          value={datePedido}
          onChange={(e) => setDatePedido(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={contratoConfidencialidad === 'S'}
              onChange={(e) => setContratoConfidencialidad(e.target.checked ? 'S' : 'X')}
              name="contratoConfidencialidad"
            />
          }
          label="Contrato Confidencialidad"
        />
        <TextField
          margin="dense"
          id="areaPeco"
          label="Área PECO"
          type="text"
          fullWidth
          value={areaPeco}
          onChange={(e) => setAreaPeco(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={correo === 'S'}
              onChange={(e) => setCorreo(e.target.checked ? 'S' : 'X')}
              name="correo"
            />
          }
          label="Correo"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={userAD === 'S'}
              onChange={(e) => setUserAD(e.target.checked ? 'S' : 'X')}
              name="userAD"
            />
          }
          label="Usuario AD"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={o365 === 'S'}
              onChange={(e) => setO365(e.target.checked ? 'S' : 'X')}
              name="o365"
            />
          }
          label="O365"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={teams === 'S'}
              onChange={(e) => setTeams(e.target.checked ? 'S' : 'X')}
              name="teams"
            />
          }
          label="Teams"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={vpn === 'S'}
              onChange={(e) => setVpn(e.target.checked ? 'S' : 'X')}
              name="vpn"
            />
          }
          label="VPN"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={endpoint === 'S'}
              onChange={(e) => setEndpoint(e.target.checked ? 'S' : 'X')}
              name="endpoint"
            />
          }
          label="Endpoint"
        />
        <TextField
          margin="dense"
          id="red"
          label="Red"
          type="text"
          fullWidth
          value={red}
          onChange={(e) => setRed(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateExternoModal;
