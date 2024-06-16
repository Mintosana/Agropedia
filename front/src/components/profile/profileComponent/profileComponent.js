import { Avatar, Rating } from '@mui/material'
import "./profileComponent.css";
import MapComponent from '../../maps/maps';
export default function ProfileComponent({ userData }) {

    const returnValue = () => {
        return 4
    }
    return (
        <div className="profileContainer">
            <Avatar className="userLogo" alt="UserLogo" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" />
            <h3 className="userData">
                Name - {userData.name} <br />
                Location - {userData.location}<br />
                Email - {userData.email}<br />
                Numar Telefon - {userData.phoneNumber}<br />
            </h3>
            <Rating
                readOnly
                value={4}
                precision={0.5}
            />
            <MapComponent Heigth={400} Width={600}/>
        </div>

    )
} 