import * as React from 'react';
import { Modal, Typography, Box, TextField, Button, Autocomplete } from '@mui/material';
import './landList.css'

import { useState, useEffect } from 'react';
import LandCard from './landCard';

export default function LandList({ landList, setLand }) {

    const [name, setName] = useState('');
    const [size, setSize] = useState(0);
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [vegetable, setVegetable] = useState('');
    const [vegetableList, setVegetableList] = useState([]);
    const [metrics, setMetrics] = useState('m²')

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const plotType = ["Solar", "Sera", "Camp"];
    const plotMetrics = ['ar','m²','ha'];


    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/product/getAllProducts`
        ).then((res) => {
            return res.json();
        }).then((productData) => {
            setVegetableList(productData.map(element => element.productName));
        })
    }, [])

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleSize = (event) => {
        setSize(event.target.value);
    }
    const handleType = (event, value) => {
        setType(value);
        setMetrics(plotMetrics[plotType.findIndex(x => x === value)])
    }
    const handleLocation = (event) => {
        setLocation(event.target.value);
    }
    const handleVegetable = (event, value) => {
        setVegetable(value);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '20px',
        p: 4,
    };

    const handleClick = async () => {
        const userToken = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const producerPromise = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/producer/getProducerByUserId/${userId}`);
        const producerObject = await producerPromise.json();
        const producerId = producerObject.id;

        const landData = {
            name: name,
            size: size,
            landType: type,
            location: location,
            producerId: producerId,
            productId: (vegetableList.findIndex(v => v === vegetable) + 1)
        }

        const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/landPlot/createLand`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${userToken}`,
            },
            body: JSON.stringify(landData)
        })

        const consumedResponse = await response.json();
        setLand([...landList, consumedResponse]);
        handleClose();
    }

    return (
        <div className='landList'>
            <h2>Lista Loturi de pamant</h2>
            <button onClick={handleOpen}>Adauga lot de pamant</button>
            <Modal
                id="plotModal"
                open={open}
                onClose={handleClose}
                aria-labelledby="modalTitle"
            >
                <Box sx={style}>
                    <Typography className="modalTitle" variant="h6" component="h2">
                        Adauga lot de pamant
                    </Typography>
                    <Box className="plotElementsBox">
                        <TextField className="plotAddField" label="Nume " variant="outlined" margin="dense" onChange={handleName} />
                        <TextField className="plotAddField" label="Locatie " variant="outlined" margin="dense" onChange={handleLocation} />
                        <TextField className="plotAddField" type="number" label={metrics ? `Marime in ${metrics}` : "Marime"} variant="outlined" margin="dense" onChange={handleSize} />
                        <Autocomplete
                            disablePortal
                            className="plotSelector"
                            onChange={handleType}
                            options={plotType}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Tip de lot" />}
                        />
                        <Autocomplete
                            disablePortal
                            className="plotSelector"
                            options={vegetableList}
                            onChange={handleVegetable}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Legume" />}
                        />
                        <Button variant="contained" sx={{ margin: "1rem" }} onClick={handleClick}>Creaza lot de pământ</Button>
                    </Box>
                </Box>
            </Modal>
            {landList.map((land) =>
                <LandCard key={land.id} individualLand={land} setLand={setLand} landList={landList} />
            )}
        </div>
    )
}