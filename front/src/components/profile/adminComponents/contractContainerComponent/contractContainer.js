import './contractContainer.css';
import { IconButton, Box, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ContractContainer({ userData, onAccept, onDeny }) {
    const handleAccept = () => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/company/validateCompanyRequestById/${userData.requestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            if (res.ok) {
                fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/updateUserToCompany/${userData.userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then((res) => {
                    if (res.ok) {
                        onAccept(userData.requestId);
                        console.log(`Cererea pentru compania ${userData.username} a fost acceptata!`);
                    }
                });
            }
        });
    };

    const handleDeny = () => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/company/deleteCompanyById/${userData.requestId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            if (res.ok) {
                onDeny(userData.requestId);
                console.log(`Cererea pentru compania ${userData.username} a fost refuzata!`);
            }
        });
    };

    return (
        <Box className='contractCard'>
            <Box className='header'>
                <Typography variant="h6" className='usernameTitle'>
                    {userData.username}
                </Typography>
                <Box className='actionColumn'>
                    <IconButton className='actionButton' onClick={handleAccept}>
                        <CheckCircleIcon />
                    </IconButton>
                    <IconButton className='actionButton' onClick={handleDeny}>
                        <CancelIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box className='contractInfo'>
                <Box className='infoColumn'>
                    <Box className='infoItem'><DescriptionIcon /> {userData.documentName}</Box>
                    <Box className='infoItem'><PhoneIcon /> {userData.phone}</Box>
                </Box>
                <Box className='infoColumn'>
                    <Box className='infoItem'><EmailIcon /> {userData.email}</Box>
                    <Box className='infoItem'><CalendarTodayIcon /> {userData.date}</Box>
                </Box>
            </Box>
        </Box>
    );
}
