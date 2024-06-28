import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import {  Snackbar, Alert, Modal, Typography, Box, TextField, Button, Autocomplete } from '@mui/material';
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
    const [metrics, setMetrics] = useState('m²');
    const [image,setImage] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [deleteEditPopup, setDeleteEditPopup] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleCloseEditModal = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setDeleteEditPopup(false);
        setOpenEditModal(false);
    }

    const plotType = ["Solar", "Sera", "Camp"];
    const plotMetrics = ['ar','m²','ha'];

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

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

    const handleImageChange = (event) => {
        if(event.target.files[0]){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImage(reader.result);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    };

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
            productId: (vegetableList.findIndex(v => v === vegetable) + 1),
            imageData : image,
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
            <Button variant='contained' onClick={handleOpen}>Adauga lot de pamant</Button>
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
                         <input id="imageInput" type="file" onChange={handleImageChange} />
                         <Button 
                         className="imageButton"
                         component="label" 
                         variant="contained" 
                         startIcon={<CloudUploadIcon/>}
                         >
                            Ataseaza Poza
                            <VisuallyHiddenInput type="file" onChange={handleImageChange}/>
                        </Button>
                        <Button variant="contained" sx={{ margin: "1rem" }} onClick={handleClick}>Creaza lot de pământ</Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={deleteEditPopup}
                autoHideDuration={6000}
                onClose={handleCloseEditModal}
            >
                <Alert onClose={handleCloseEditModal} severity="success" sx={{ width: '100%' }}>
                    Lotul de pamant a fost sters!
                </Alert>
            </Snackbar>
            {landList.map((land) =>
            {
                // console.log(land);
                return <LandCard key={land.id} individualLand={land} setLand={setLand} landList={landList} vegetableList={vegetableList} open={openEditModal} setOpen={setOpenEditModal} handleClose={handleCloseEditModal} setDeletePopup={setDeleteEditPopup} />
          
            }
                  )}
        </div>
    )
}