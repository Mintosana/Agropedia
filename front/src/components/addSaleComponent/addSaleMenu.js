import * as React from 'react';
import { TextField, Autocomplete, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./addSaleMenu.css";

import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

export default function AddSaleMenu() {
    const navigate = useNavigate();
    const [vegetableList, setVegetableList] = useState([]);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        announcementTitle: "",
        description: "",
        price: "",
        totalQuantity: "",
        producerId: 0,
        productId: 0,
        base64Image: null,
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/producer/getProducerByUserId/${localStorage.getItem("userId")}`
        ).then(res => res.json()
        ).then(data => {
            setData(prevData => ({
                ...prevData,
                producerId: data.id,
            }));
        });
    }, [])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/product/getAllProducts`
        ).then((res) => {
            return res.json();
        }).then((productData) => {
            setVegetableList(productData.map(element => element.productName));
        })

    }, [])

    const handleVegetable = (event, value) => {
        setData(prevData => ({
            ...prevData,
            productId: vegetableList.findIndex(v => v === value) + 1
        }))
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        if(event.target.files[0]){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setData(prevData => ({
                    ...prevData,
                    base64Image: reader.result,
                }));
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleClick = () => {
        const { announcementTitle, description, price, totalQuantity, productId, base64Image } = data;
        let validationErrors = {};
        if (!announcementTitle) validationErrors.announcementTitle = "Titlul anunțului este obligatoriu.";
        if (!description) validationErrors.description = "Descrierea produsului este obligatorie.";
        if (!price) validationErrors.price = "Prețul este obligatoriu.";
        if (price <= 0) validationErrors.price = "Prețul trebuie să fie o valoare pozitivă.";
        if (!totalQuantity) validationErrors.totalQuantity = "Cantitatea este obligatorie.";
        if (totalQuantity <= 0) validationErrors.totalQuantity = "Cantitatea trebuie să fie o valoare pozitivă.";
        if (productId === 0) validationErrors.productId = "Trebuie să selectați un produs.";
        if (!base64Image) validationErrors.base64Image = "Atașarea unei poze este obligatorie.";
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            const firstErrorMessage = Object.values(validationErrors)[0];
            setSnackbarMessage(firstErrorMessage);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/sale/createSale`, {
            method: "POST",
            headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                alert(`Anuntul pentru ${data.announcementTitle} a fost postat cu succes!`);
                navigate('/homepage');
            }).catch(error => {
                setSnackbarMessage('Eroare la postarea anunțului. Încercați din nou.');
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
                console.error('Error:', error);
            });
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="addSaleComponent">
            <h1>Posteaza un anunț!</h1>
            <TextField variant="outlined" label="Titlul anuntului" name="announcementTitle" value={data.announcementTitle} onChange={handleChange} error={!!errors.announcementTitle} helperText={errors.announcementTitle} />
            <TextField variant="outlined" label="Descrierea produsului" name="description" value={data.description} onChange={handleChange} error={!!errors.description} helperText={errors.description} />
            <TextField variant="outlined" type="number" label="Pret/Kg" name="price" value={data.price} onChange={handleChange} error={!!errors.price} helperText={errors.price} />
            <TextField variant="outlined" type="number" label="Cantitate (Kg)" name="totalQuantity" value={data.totalQuantity} onChange={handleChange} error={!!errors.totalQuantity} helperText={errors.totalQuantity} />
            <Autocomplete
                disablePortal
                className="saleProduct"
                options={vegetableList}
                onChange={handleVegetable}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Legume"
                    error={!!errors.productId}
                    helperText={errors.productId} />}
            />
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="file-input"
                onChange={handleImageChange}
            />
            <label htmlFor="file-input">
                <Button
                    variant="contained"
                    component="span"
                    sx={{ marginTop: '16px', marginBottom: '16px' }}
                >
                    Atașează o poză
                </Button>
            </label>
            <Button variant="contained" onClick={handleClick}>Posteaza anunțul!</Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
