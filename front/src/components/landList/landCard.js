import * as React from 'react';
import {Snackbar,Alert} from '@mui/material';
import {IconButton} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {useState} from 'react';
import './landCard.css'


export default function LandCard({ individualLand, setLand, landList }) {
    const [open,setOpen] = useState(false);
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
            //console.log(landList);
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
                    <p>Mărime: {individualLand.size}m</p>
                    <p>Temperatură: {individualLand.temperature}C</p>
                    <p>Umiditate: {individualLand.humidity}%</p>
                    <p>Tip: {individualLand.landType}</p>
                    <p>Produs: Rosii</p> {/*{individualLand.productName}*/}
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