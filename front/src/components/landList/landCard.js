import * as React from 'react';
import { Modal, Box, Typography, TextField, Autocomplete, Button, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './landCard.css';

export default function LandCard({ individualLand, setLand, landList, vegetableList, setDeletePopup }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [productName, setProductName] = useState(vegetableList[individualLand.productId - 1]);
    const [humidity, setHumidity] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const plotType = ["Solar", "Sera", "Camp"];
    const plotMetrics = ['ari', 'm²', 'ha'];

    const [name, setName] = useState(individualLand.name);
    const [size, setSize] = useState(individualLand.size);
    const [type, setType] = useState(individualLand.landType);
    const [metrics, setMetrics] = useState(plotMetrics[plotType.findIndex(metric => metric === individualLand.landType)]);
    const [location, setLocation] = useState(individualLand.location);
    const [vegetable, setVegetable] = useState(vegetableList[individualLand.productId - 1]);
    const [image, setImage] = useState(individualLand.imageData);

    const [treatmentList, setTreatmentList] = useState(individualLand.treatment); // CU ASTEA LUCREZ
    const [fertilizerList, setFertilizerList] = useState(individualLand.fertiliser);  // CU ASTEA LUCREZ
    const [newTreatment, setNewTreatment] = useState('');
    const [newFertilizer, setNewFertilizer] = useState('');
    
    const landData = {
        id: individualLand.id,
        name: name,
        size: size,
        location: location,
        fertilisers: fertilizerList, // CU ASTEA LUCREZ
        treatments: treatmentList, // CU ASTEA LUCREZ
        landType: type,
        producerId: individualLand.producerId,
        productId: (vegetableList.findIndex(v => v === vegetable) + 1),
        imageData: image,
    };

    useEffect(() => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${landData.location}&limit=1&appid=${process.env.REACT_APP_WEATHER_API}`)
            .then(res => res.json())
            .then(res => {
                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${res[0].lat}&lon=${res[0].lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`)
                    .then(res => res.json())
                    .then(res => {
                        setHumidity(res.current.humidity);
                        setTemperature(res.current.temp);
                    });
            });
    }, [landList]);

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
    };
    const handleSize = (event) => {
        setSize(event.target.value);
    };
    const handleType = (event, value) => {
        setType(value);
        setMetrics(plotMetrics[plotType.findIndex(x => x === value)]);
    };
    const handleLocation = (event) => {
        setLocation(event.target.value);
    };
    const handleVegetable = (event, value) => {
        setVegetable(value);     
    };
    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    const handleDeleteClick = (id) => {
        setDeletePopup(true);
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/landPlot/deletePlotById/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                setLand(landList.filter((land) => land.id !== individualLand.id));
            })
            .catch(error => {
                console.error("Eroare la stergerea lotului de pamant:", error);
            });
    };
    const handleClick = async () => {
        const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/landPlot/updatePlotById/${individualLand.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(landData),
        });
        if (response.ok) {
            setLand(landList.map(land =>
                land.id === individualLand.id ? landData : land
            ));
            setProductName(vegetable);
        }

        handleClose();
    };
    const handleEditClick = async () => {
        setOpen(true);
    };
    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const handleAddTreatment = () => {
        if (newTreatment.trim()) {
            console.log(treatmentList)
            if(treatmentList){
                setTreatmentList([...treatmentList, newTreatment.trim()]);
            }
            else{
                setTreatmentList([newTreatment.trim()])
            }
            
            setNewTreatment('');
        }
    };
    const handleAddFertilizer = () => {
        if (newFertilizer.trim()) {
            if(fertilizerList){
                setFertilizerList([...fertilizerList, newFertilizer.trim()]);
            }
            else{
                setFertilizerList([newFertilizer.trim()])
            }
            setNewFertilizer('');
        }
    };

    return (
        <>
        <div className={`landPreview ${expanded ? 'expanded' : ''}`} key={individualLand.id} onClick={toggleExpand}>
            <div className='wholeContent'>
                <div className="imageData">
                    <img className="cardImage" src={individualLand.imageData} alt={individualLand.name} />
                    <h3>{individualLand.name}</h3>
                </div>
                <div className='contentData'>
                    <p>Mărime: {individualLand.size} {metrics}</p>
                    <p>Temperatură: {temperature}°C</p>
                    <p>Umiditate: {humidity}%</p>
                    <p>Tip: {individualLand.landType}</p>
                    <p>Produs: {productName}</p>
                    {expanded && (
                        <div className='additionalInfo'>
                            <p>Tratament:
                                <b>
                                    {treatmentList && treatmentList.map((treatment, index) => (
                                        <React.Fragment key={index}>
                                            <br />
                                            {treatment}
                                        </React.Fragment>
                                    ))}
                                </b></p>
                            <p>Fertilizant:
                                <b>
                                    {fertilizerList && fertilizerList.map((fertilizer, index) => (
                                        <React.Fragment key={index}>
                                            <br />
                                            {fertilizer}
                                        </React.Fragment>
                                    ))}
                                </b></p>
                        </div>
                    )}
                </div>
                <div className='manageLandIcons'>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteClick(individualLand.id); }}>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleEditClick(); }}>
                        <Edit />
                    </IconButton>
                </div>
            </div>
            
        </div >
        <Modal
                id="plotEditModal"
                open={open}
                onClose={handleClose}
                aria-labelledby="modalTitle"
            >
                <Box sx={style}>
                    <Typography className="modalTitle" variant="h6" component="h2">
                        Lot de pamant - {landData.name}
                    </Typography>
                    <div className="modalContent">
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Nume"
                            value={name}
                            onChange={handleName}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Mărime"
                            value={size}
                            onChange={handleSize}
                        />
                        <Autocomplete
                            fullWidth
                            options={plotType}
                            value={type}
                            onChange={handleType}
                            renderInput={(params) => <TextField {...params} margin="normal" label="Tip" />}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Locație"
                            value={location}
                            onChange={handleLocation}
                        />
                        <Autocomplete
                            fullWidth
                            options={vegetableList}
                            value={vegetable}
                            onChange={handleVegetable}
                            renderInput={(params) => <TextField {...params} margin="normal" label="Produs" />}
                        />
                        <label htmlFor="imageUpload">
                            <VisuallyHiddenInput
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<CloudUploadIcon />}
                                component="span"
                            >
                                Upload Image
                            </Button>
                        </label>
                        <div className="treatmentList">
                            <TextField
                                fullWidth
                                margin="normal"
                                label="New Treatment"
                                value={newTreatment}
                                onChange={(e) => setNewTreatment(e.target.value)}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleAddTreatment}
                            >
                                Add Treatment
                            </Button>
                        </div>
                        <div className="fertilizerList">
                            <TextField
                                fullWidth
                                margin="normal"
                                label="New Fertilizer"
                                value={newFertilizer}
                                onChange={(e) => setNewFertilizer(e.target.value)}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleAddFertilizer}
                            >
                                Add Fertilizer
                            </Button>
                        </div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
