import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Snackbar, Alert } from '@mui/material';

const products = ["Morcovi", "Cartofi", "Ceapă"];

export default function EstablishContract() {
    const [open, setOpen] = useState(false);
    const [producers, setProducers] = useState([]);
    const [company,setCompany] = useState(null);
    const [formData, setFormData] = useState({
        firmName: "",
        firmAddress: "",
        firmPhone: "",
        firmCF: "",
        firmRC: "",
        firmBankAccount: "",
        firmBankName: "",
        productName: "",
        producerId: "",
        companyId:"",
        quantity: "",
        price: "",
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let tempErrors = {};
        let valid = true;
        Object.keys(formData).forEach((field) => {
            if (!formData[field]) {
                tempErrors[field] = "Acest câmp este obligatoriu";
                valid = false;
            }
        });
        if (formData.firmPhone && !/^\d+$/.test(formData.firmPhone)) {
            tempErrors.firmPhone = "Doar cifre sunt permise";
            valid = false;
        }
        if (formData.quantity && !/^\d+$/.test(formData.quantity)) {
            tempErrors.quantity = "Doar cifre sunt permise";
            valid = false;
        }
        if (formData.price && !/^\d+$/.test(formData.price)) {
            tempErrors.price = "Doar cifre sunt permise";
            valid = false;
        }
        setErrors(tempErrors);
        return valid;
    };

    const fetchProducers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/producer/getAllProducers`);
            const data = await response.json();
            setProducers(data);
        } catch (error) {
            console.error("Eroare la preluarea producătorilor:", error);
        }
    };

    const fetchCompanyId = async () => {
        try {
            const userId = localStorage.getItem('userId')
            const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/company/getCompanyByUserId/${userId}`);
            const data = await response.json();
            
            setFormData({ ...formData, 'companyId': data.id });
        } catch (error) {
            console.error("Eroare la preluarea producătorilor:", error);
        }
    };
    useEffect(() => {
        fetchProducers();
        fetchCompanyId();
    }, []);

    const handleSubmit = async () => {
        if (validateForm()) {
            await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/company/generate-contract`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData
                }),
            });
            handleClose();
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>Generează Contract</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Generează Contract</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firmName"
                        label="Numele firmei"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.firmName}
                        onChange={handleChange}
                        error={!!errors.firmName}
                        helperText={errors.firmName}
                    />
                    <TextField
                        margin="dense"
                        name="firmAddress"
                        label="Adresa firmei"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.firmAddress}
                        onChange={handleChange}
                        error={!!errors.firmAddress}
                        helperText={errors.firmAddress}
                    />
                    <TextField
                        margin="dense"
                        name="firmPhone"
                        label="Telefonul firmei"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.firmPhone}
                        onChange={handleChange}
                        error={!!errors.firmPhone}
                        helperText={errors.firmPhone}
                    />
                    <TextField
                        margin="dense"
                        name="firmCF"
                        label="Cod fiscal"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.firmCF}
                        onChange={handleChange}
                        error={!!errors.firmCF}
                        helperText={errors.firmCF}
                    />
                    <TextField
                        margin="dense"
                        name="firmRC"
                        label="Număr de înregistrare"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.firmRC}
                        onChange={handleChange}
                        error={!!errors.firmRC}
                        helperText={errors.firmRC}
                    />
                    <TextField
                        margin="dense"
                        name="firmBankAccount"
                        label="Cont bancar"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.firmBankAccount}
                        onChange={handleChange}
                        error={!!errors.firmBankAccount}
                        helperText={errors.firmBankAccount}
                    />
                    <TextField
                        margin="dense"
                        name="firmBankName"
                        label="Numele băncii"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.firmBankName}
                        onChange={handleChange}
                        error={!!errors.firmBankName}
                        helperText={errors.firmBankName}
                    />
                    <TextField
                        margin="dense"
                        name="productName"
                        label="Produs"
                        select
                        fullWidth
                        variant="standard"
                        value={formData.productName}
                        onChange={handleChange}
                        error={!!errors.productName}
                        helperText={errors.productName}
                    >
                        {products.map((product) => (
                            <MenuItem key={product} value={product}>
                                {product}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        name="producerId"
                        label="Producător"
                        select
                        fullWidth
                        variant="standard"
                        value={formData.producerId}
                        onChange={handleChange}
                        error={!!errors.producerId}
                        helperText={errors.producerId}
                    >
                        {producers.map((producer) => (
                            <MenuItem key={producer.id} value={producer.id}>
                                {producer.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        name="quantity"
                        label="Cantitate"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.quantity}
                        onChange={handleChange}
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Preț"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Anulează</Button>
                    <Button onClick={handleSubmit}>Generează Contract</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Contractul a fost trimis către producător!
                </Alert>
            </Snackbar>
        </>
    );
}
