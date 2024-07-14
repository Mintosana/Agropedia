import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import {Box,Typography} from '@mui/material'
import "./uploadDocument.css";

export default function UploadDocument() {
    const [file, setFile] = useState(null);
    const [buttonColor,setButtonColor] = useState('primary');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setButtonColor("success");
    };

    const handleButtonClick = () => {
        document.getElementById('file-upload').click();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User ID not found in localStorage');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);

        try {
            const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/uploadCompanyDocument/${userId}`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert('Document trimis cu succes!');
                setButtonColor('primary');
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Error uploading document');
        }
    };

    return (
            <Box
              sx={{
                backgroundColor: 'white',
                padding: 3,
                borderRadius: 5,
                boxShadow: 1,
                textAlign: 'center',
                maxWidth: 400,
                margin: 'auto'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Ești o companie? urcă documentul doveditor aici!
              </Typography>
              <form onSubmit={handleSubmit} className="upload-form">
                <ButtonGroup variant="contained" size="small">
                  <Button onClick={handleButtonClick} color={buttonColor}>Choose File</Button>
                  <Button endIcon={<SendIcon />} type="submit">Upload</Button>
                </ButtonGroup>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="upload-input"
                  style={{ display: 'none' }}
                />
              </form>
            </Box>
          );
};
