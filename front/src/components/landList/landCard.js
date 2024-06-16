import * as React from 'react';
import { Snackbar, Alert, Modal, Box, Typography,TextField,Autocomplete,Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './landCard.css'


export default function LandCard({ individualLand, setLand, landList, vegetableList}) {
    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState(vegetableList[individualLand.productId - 1]);
    const [humidity, setHumidity] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const plotType = ["Solar", "Sera", "Camp"];
    const plotMetrics = ['ari', 'm²', 'ha'];

    const [name, setName] = useState(individualLand.name);
    const [size, setSize] = useState(individualLand.size);
    const [type, setType] = useState(individualLand.landType);
    const [metrics, setMetrics] = useState(plotMetrics[plotType.findIndex(metric => metric ===individualLand.landType)]); 
    const [location, setLocation] = useState(individualLand.location);
    const [vegetable, setVegetable] = useState(vegetableList[individualLand.productId - 1]);
    const [image,setImage] = useState(individualLand.imageData);

    const landData = {
        name: name,
        size: size,
        landType: type,
        location: location,
        producerId: individualLand.producerId,
        productId: (vegetableList.findIndex(v => v === vegetable) + 1),
        imageData : image,
    }

    useEffect(() => {
        console.log(landData.location);
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${landData.location}&limit=1&appid=${process.env.REACT_APP_WEATHER_API}`)
            .then(res => res.json())
            .then(res => {
                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${res[0].lat}&lon=${res[0].lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`)
                    .then(res => res.json())
                    .then(res => {
                        setHumidity(res.current.humidity);
                        setTemperature(res.current.temp);
                    })
            })
    }, [landList])

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


    const handleDeleteClick = (id) => {
        setOpen(true);
        console.log(open);
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/landPlot/deletePlotById/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(landList);
                setLand(landList.filter((land) => land.id !== individualLand.id));
                return res;
            })
            .then((consumedRes) => {
               // alert(`Lotul de pamant cu numele ${individualLand.name} a fost sters cu succes!`)
               //Nu stiu de ce snackbar-ul se afiseaza doar cand am acest alert
            }).catch(error => {
                console.error("Eroare la stergerea lotului de pamant:", error);
            })
    }

    const handleClick = async () => {
        const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/landPlot/updatePlotById/${individualLand.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(landData),
        })
        
        const consumedResponse = await response.json();
        setLand(landList.map(land => 
            land.id === consumedResponse.id ? consumedResponse : land
        ));
        handleClose();
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const handleEditClick = async () => {
        setOpen(true);
        // alert("Inca nu pot edita")  
    }

    return (
        <div className='landPreview' key={individualLand.id}>
            <div className='wholeContent'>
                <div className="imageData">
                    <img className="cardImage" src={individualLand.imageData} />
                    <h3>{individualLand.name}</h3>
                </div>
                <div className='contentData'>
                    <p>Mărime: {individualLand.size} {`${plotMetrics[plotType.findIndex(x => x === individualLand.landType)]}`}</p>
                    <p>Temperatură: {temperature}C</p>
                    <p>Umiditate: {humidity}%</p>
                    <p>Tip: {individualLand.landType}</p>
                    <p>Produs: {productName}</p>
                </div>
                <div className='manageLandIcons'>
                    <IconButton onClick={() => handleDeleteClick(individualLand.id)}>
                        <Delete />
                    </IconButton>
                    {/* <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Lotul de pamant cu id-ul {individualLand.id} a fost sters!
                        </Alert>
                    </Snackbar> */}
                    <IconButton onClick={handleEditClick}>
                        <Edit />
                    </IconButton>
                </div>
            </div>
            <Modal
                id="plotEditModal"
                open={open}
                onClose={handleClose}
                aria-labelledby="modalTitle"
            >
                <Box sx={style}>
                    <Typography className="modalTitle" variant="h6" component="h2">
                        Lot de pamant - {individualLand.name}
                    </Typography>
                    <Box className="plotElementsBox">
                        <TextField className="plotAddField" defaultValue={name} label="Nume " variant="outlined" margin="dense" onChange={handleName} />
                        <TextField className="plotAddField" defaultValue={location} label="Locatie " variant="outlined" margin="dense" onChange={handleLocation} />
                        <TextField className="plotAddField" type="number" defaultValue={size} label={metrics ? `Marime in ${metrics}` : "Marime"} variant="outlined" margin="dense" onChange={handleSize} />
                        <Autocomplete
                            disablePortal
                            className="plotSelector"
                            onChange={handleType}
                            defaultValue={type}
                            options={plotType}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Tip de lot" />}
                        />
                        <Autocomplete
                            disablePortal
                            className="plotSelector"
                            options={vegetableList}
                            onChange={handleVegetable}
                            defaultValue={vegetableList[individualLand.productId - 1]}
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
                        <Button variant="contained" sx={{ margin: "1rem" }} onClick={handleClick}>Editeaza lot de pământ</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}