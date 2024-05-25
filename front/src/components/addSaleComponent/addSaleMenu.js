import * as React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import "./addSaleMenu.css";

import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

export default function AddSaleMenu() {
    const [vegetableList, setVegetableList] = useState([]);
    const [data, setData] = useState({
        announcementTitle: "",
        description: "",
        price: "",
        totalQuantity: "",
        producerId: 0,
        productId: 0,
    });

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

    const handleClick = () => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/sale/createSale`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    return (
        <div className="addSaleComponent">
            <h1>Posteaza un anunț!</h1>
            <TextField variant="outlined" label="Titlul anuntului" name="announcementTitle" value={data.announcementTitle} onChange={handleChange} />
            <TextField variant="outlined" label="Descrierea produsului" name="description" value={data.description} onChange={handleChange} />
            <TextField variant="outlined" type="number" label="Pret" name="price" value={data.price} onChange={handleChange} />
            <TextField variant="outlined" type="number" label="Cantitate" name="totalQuantity" value={data.totalQuantity} onChange={handleChange} />
            <Autocomplete
                disablePortal
                className="saleProduct"
                options={vegetableList}
                onChange={handleVegetable}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Legume" />}
            />
            <Button variant="contained" onClick={handleClick}>Posteaza anunțul!</Button>
        </div>
    )
}