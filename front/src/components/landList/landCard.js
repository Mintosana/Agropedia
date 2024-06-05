import * as React from 'react';
import {Snackbar,Alert} from '@mui/material';
import {IconButton} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {useState, useEffect} from 'react';
import './landCard.css'


export default function LandCard({ individualLand, setLand, landList }) {
    const [open,setOpen] = useState(false);
    const [productName, setProductName] = useState(null);
    const [humidity, setHumidity] = useState(0);
    const [temperature,setTemperature] = useState(0);
    const plotType = ["Solar", "Sera", "Camp"];
    const plotMetrics = ['ari','m²','ha'];

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/product/getProductById/${individualLand.productId}`)
        .then(res => res.json())
        .then(res =>{
            setProductName(res.productName);
        })
    },[])

    useEffect(()=> {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${individualLand.location}&limit=1&appid=${process.env.REACT_APP_WEATHER_API}`)
        .then(res => res.json())
        .then(res =>{
            fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${res[0].lat}&lon=${res[0].lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`)
            .then(res => res.json())
            .then(res => {
                setHumidity(res.current.humidity);
                setTemperature(res.current.temp);
            })
        })
    },[landList])

    const handleDeleteClick = (id)=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/landPlot/deletePlotById/${id}`,
        {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            setOpen(true);
            console.log(landList);
            setLand(landList.filter((land)=> land.id !== individualLand.id));
            return res;
        })
        .then((consumedRes)=>{
            console.log(consumedRes)
            alert(`Lotul de pamant cu numele ${individualLand.name} a fost sters cu succes!`)
        });
    }
    const handleEditClick = ()=>{
        alert("Inca nu pot edita")
    }
    return (
        <div className='landPreview' key={individualLand.id}>
            <div className='wholeContent'>
                <div style={{ display: "flex", flexDirection: "column", }}>
                    <img className="cardImage" src="/LandscapeTemplate.png" />
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
                        <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        message={`Lotul de pamant cu id-ul ${individualLand.id} a fost sters!`}
                        />
                        <Delete />
                    </IconButton>
                    <IconButton onClick={handleEditClick}>
                        <Edit />
                    </IconButton>

                </div>
            </div>
        </div>
    )
}