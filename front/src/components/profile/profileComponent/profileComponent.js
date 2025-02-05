import { Avatar, Rating } from '@mui/material'
import "./profileComponent.css";
import MapComponent from '../../maps/maps';
import {useEffect, useState} from 'react';
export default function ProfileComponent({ userData }) {
    const [coordinates,setCoordinates] = useState(null);
    const [rating,setRating] = useState(5);
    useEffect(()=>{
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userData.location}&limit=1&appid=${process.env.REACT_APP_WEATHER_API}`)
            .then(res => res.json())
            .then(res => {
                setCoordinates([res[0].lat,res[0].lon]);
            })

        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/review/getReviewsByUserId/${localStorage.getItem("userId")}`)
        .then(res => res.json())
        .then(res => {
            setRating(res.averageScore);
        })
    },[])

    const returnValue = () => {
        return 4
    }
    return (
        <div className="profileContainer" style={{margin:"1rem 0 0 0"}}>
            <Avatar className="userLogo" alt="UserLogo" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" />
            <h3 className="userData">
                Name - {userData.name} <br />
                Location - {userData.location}<br />
                Email - {userData.email}<br />
                Numar Telefon - {userData.phoneNumber}<br />
            </h3>
            {localStorage.getItem('type') == 'Producator' && <Rating
                readOnly
                value={rating}
                precision={0.5}
            />}
            {coordinates && <MapComponent Lat = {coordinates[0]} Long={coordinates[1]} Heigth={400} Width={600}/>}
        </div>

    )
} 