import { Avatar, Rating } from '@mui/material';
import {useState,useEffect} from 'react';
import './reviewEntry.css';

export default function ReviewEntry({ reviewData }) {
    const [userData,setUserData] = useState({});
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getUserById/${reviewData.reviewerId}`)
        .then(res=>res.json())
        .then(reviewer => {
            setUserData(reviewer)
        })
    },[])

    return (
        <div className="reviewEntry">
            <div className="userPart">
                <Avatar className="userLogo" alt="UserLogo" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" />
                <h4 className="userName">{userData.name}</h4>
            </div>
            <div className="ratingPart">
                <h3>{reviewData.message}</h3>
                <Rating readOnly value={reviewData.score}></Rating>
            </div>
        </div>

    )
}