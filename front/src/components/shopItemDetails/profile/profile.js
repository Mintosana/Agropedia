import { Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import './profile.css'
import MapComponent from '../../maps/maps';



export default function Profile({ producerId }) {
    const [producerData, setProducerData] = useState({});
    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getUserByProducerId/${producerId}`)
            .then(res => res.json())
            .then(producerData => {
                setProducerData(producerData);
            })
    }, [])

    return (
        <div className="profileComponent">
            <Avatar className="userLogo" alt="UserLogo" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" />
            <h1>{producerData.name}</h1>
            <h2>{producerData.phoneNumber}  - {producerData.location}</h2>
            <MapComponent Height={200} Width={500} Lat={43.9024078} Long={24.6121711}></MapComponent>
        </div>
    )
}