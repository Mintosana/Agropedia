import React, { useEffect, useState } from 'react';
import { Box, Paper, Snackbar, Alert } from '@mui/material';
import ContractCard from '../contractCard/contractCard';

async function getProducerId() {
    const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/producer/getProducerByUserId/${localStorage.getItem('userId')}`);
    const data = await response.json();
    return data.id;
}

async function getAllContractsByProducerId(producerId) {
    console.log(producerId);
    const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/contract/getAllContractsByProducerId/${producerId}`);
    const data = await response.json();
    console.log(data)
    return data;
}

const ContractList = () => {
    const [contracts, setContracts] = useState([]);
    const [producerId, setProducerId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchProducerId = async () => {
            try {
                const id = await getProducerId();
                setProducerId(id);
            } catch (error) {
                console.error("Error fetching producer ID:", error);
            }
        };

        fetchProducerId();
    }, []);

    useEffect(() => {
        const fetchContracts = async () => {
            if (producerId) {
                try {
                    const fetchedContracts = await getAllContractsByProducerId(producerId);
                    setContracts(fetchedContracts);
                } catch (error) {
                    console.error("Error fetching contracts:", error);
                }
            }
        };

        fetchContracts();
    }, [producerId]);

    const handleAcceptContract = async (contractId) => {
        setContracts(contracts.filter(contract => contract.id !== contractId));
        try {
            await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/contract/acceptContractById/${contractId}`, {
                method: 'PUT',
            });
            setSnackbarMessage('Contractul a fost acceptat');
        } catch (error) {
            setSnackbarMessage('Eroare la acceptarea contractului');
        }
        setSnackbarOpen(true);
    };

    const handleDenyContract = async (contractId) => {
        setContracts(contracts.filter(contract => contract.id !== contractId));
        try {
            await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/contract/refuseContractById/${contractId}`, {
                method: 'PUT',
            });
            setSnackbarMessage('Contractul a fost refuzat');
        } catch (error) {
            setSnackbarMessage('Eroare la refuzarea contractului');
        }
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                borderRadius: 2,
                maxHeight: '60rem',
                overflowY: 'auto',
                marginBottom: 2,
                width: '100%'
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Contracte de la companii:</h2>
            {contracts.length !== 0 ? contracts.map(contract => (
                <ContractCard
                    key={contract.id}
                    contract={contract}
                    onAccept={handleAcceptContract}
                    onDeny={handleDenyContract}
                />
            )) : <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <div>Nu exista contracte la momentul actual</div>
            </Box>}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default ContractList;
