import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Checkbox, FormControlLabel } from '@mui/material';

const EditExternoModal = ({ open, onClose, externo, onEdit }) => {
    const [empresa, setEmpresa] = useState("");
    const [nombres, setNombres] = useState("");
    const [macWifi, setMacWifi] = useState("");
    const [dateAntivirus, setDateAntivirus] = useState("");
    const [contratoConfidencialidad, setContratoConfidencialidad] = useState(false);
    const [areaPeco, setAreaPeco] = useState("");
    const [correo, setCorreo] = useState(false);
    const [userAD, setUserAD] = useState(false);
    const [o365, setO365] = useState(false);
    const [teams, setTeams] = useState(false);
    const [vpn, setVpn] = useState(false);
    const [red, setRed] = useState("");
    const [endpoint, setEndpoint] = useState(false);
    const [datePedido, setDatePedido] = useState("");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const convertToBool = (value) => value === "S";

    useEffect(() => {
        if (externo) {
            setEmpresa(externo.EMPRESA);
            setNombres(externo.NOMBRES);
            setMacWifi(externo.MAC_WIFI);
            setDateAntivirus(formatDate(externo.DATE_ANTIVIRUS));
            setContratoConfidencialidad(convertToBool(externo.CONTRATO_CONFIDENCIALIDAD));
            setAreaPeco(externo.AREA_PECO);
            setCorreo(convertToBool(externo.CORREO));
            setUserAD(convertToBool(externo.USER_AD));
            setO365(convertToBool(externo.O365));
            setTeams(convertToBool(externo.TEAMS));
            setVpn(convertToBool(externo.VPN));
            setRed(externo.RED);
            setEndpoint(convertToBool(externo.ENDPOINT));
            setDatePedido(formatDate(externo.DATE_PEDIDO));
        }
    }, [externo]);

    const handleSave = () => {
        onEdit(externo.ID, {
            ID: externo.ID,
            EMPRESA: empresa,
            NOMBRES: nombres,
            MAC_WIFI: macWifi,
            DATE_ANTIVIRUS: dateAntivirus,
            CONTRATO_CONFIDENCIALIDAD: contratoConfidencialidad ? "S" : "X",
            AREA_PECO: areaPeco,
            CORREO: correo ? "S" : "X",
            USER_AD: userAD ? "S" : "X",
            O365: o365 ? "S" : "X",
            TEAMS: teams ? "S" : "X",
            VPN: vpn ? "S" : "X",
            RED: red,
            ENDPOINT: endpoint ? "S" : "X",
            DATE_PEDIDO: datePedido
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Externo</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="empresa" label="Empresa" type="text" fullWidth value={empresa} onChange={e => setEmpresa(e.target.value)} />
                <TextField margin="dense" id="nombres" label="Nombres" type="text" fullWidth value={nombres} onChange={e => setNombres(e.target.value)} />
                <TextField margin="dense" id="macWifi" label="MAC WiFi" type="text" fullWidth value={macWifi} onChange={e => setMacWifi(e.target.value)} />
                <TextField margin="dense" id="dateAntivirus" label="Fecha Antivirus" type="date" InputLabelProps={{ shrink: true }} fullWidth value={dateAntivirus} onChange={e => setDateAntivirus(e.target.value)} />
                <TextField margin="dense" id="datePedido" label="Fecha Pedido" type="date" InputLabelProps={{ shrink: true }} fullWidth value={datePedido} onChange={e => setDatePedido(e.target.value)} />
                <FormControlLabel control={<Checkbox checked={contratoConfidencialidad} onChange={e => setContratoConfidencialidad(e.target.checked)} />} label="Contrato Confidencialidad" />
                <TextField margin="dense" id="areaPeco" label="Área PECO" type="text" fullWidth value={areaPeco} onChange={e => setAreaPeco(e.target.value)} />
                <FormControlLabel control={<Checkbox checked={correo} onChange={e => setCorreo(e.target.checked)} />} label="Correo" />
                <FormControlLabel control={<Checkbox checked={userAD} onChange={e => setUserAD(e.target.checked)} />} label="Usuario AD" />
                <FormControlLabel control={<Checkbox checked={o365} onChange={e => setO365(e.target.checked)} />} label="O365" />
                <FormControlLabel control={<Checkbox checked={teams} onChange={e => setTeams(e.target.checked)} />} label="Teams" />
                <FormControlLabel control={<Checkbox checked={vpn} onChange={e => setVpn(e.target.checked)} />} label="VPN" />
                <TextField margin="dense" id="red" label="Red" type="text" fullWidth value={red} onChange={e => setRed(e.target.value)} />
                <FormControlLabel control={<Checkbox checked={endpoint} onChange={e => setEndpoint(e.target.checked)} />} label="Endpoint" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={handleSave} color="primary">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditExternoModal;
