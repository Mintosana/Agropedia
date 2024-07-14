import React, { useState, useEffect } from 'react';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const ContractCard = ({ contract, onAccept, onDeny }) => {
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        const getCompanyData = async () => {
            const data = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getUserByCompanyId/${contract.companyId}`);
            const companyData = await data.json();
            setCompanyData(companyData);
        };
        getCompanyData();
    }, [contract.companyId]);

    const handleDownload = () => {
        window.location.href = `${process.env.REACT_APP_LOCALHOST_BACK}/api/company/downloadContract/${contract.id}`;
    };

    const handleAccept = () => {
        onAccept(contract.id);
    };

    const handleDeny = () => {
        onDeny(contract.id);
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }) + ' ' + date.toLocaleTimeString('ro-RO');
    };

    return (
        companyData && (
            <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', padding: 2, marginBottom: 1, borderRadius: 1 }}>
                <IconButton onClick={handleDownload} sx={{ marginRight: 2 }}>
                    <DownloadIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">{`Companie: ${contract.companyName ? contract.companyName : companyData.name}`}</Typography>
                    <Typography variant="body1">{`Nr Telefon: ${companyData.phoneNumber}`}</Typography>
                    <Typography variant="body1">{`Email: ${companyData.email}`}</Typography>
                    <Typography variant="body1">{`Data eliberare contract: ${formatDate(contract.createdAt)}`}</Typography>
                </Box>
                <IconButton onClick={handleAccept}>
                    <CheckIcon color="success" />
                </IconButton>
                <IconButton onClick={handleDeny}>
                    <CloseIcon color="error" />
                </IconButton>
            </Paper>
        )
    );
};

export default ContractCard;
