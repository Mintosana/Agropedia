import ContractContainer from "../contractContainerComponent/contractContainer";
import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import "./contractList.css";

export default function ContractList() {
    const [companyRequests, setCompanyRequests] = useState([]);
    const [containerData, setContainerData] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/company/getUnvalidatedCompanies`)
            .then(res => res.json())
            .then(res => {
                setCompanyRequests(res);
                res.forEach(request => {
                    fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getUserById/${request.userId}`)
                        .then(res => res.json())
                        .then(userData => {
                            setContainerData(prevData => ({
                                ...prevData,
                                [request.id]: {
                                    requestId: request.id,
                                    userId: request.userId,
                                    username: userData.name,
                                    documentName: request.documentName,
                                    phone: userData.phoneNumber,
                                    email: userData.email,
                                    date: request.createdAt.substr(0, 10),
                                }
                            }));
                        });
                });
            });
    }, []);

    const handleAccept = (requestId, username) => {
        setCompanyRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        setContainerData(prevData => {
            const newData = { ...prevData };
            delete newData[requestId];
            return newData;
        });
        setSnackbar({ open: true, message: `Cererea pentru compania ${username} a fost acceptată!`, severity: 'success' });
    };

    const handleDeny = (requestId, username) => {
        setCompanyRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        setContainerData(prevData => {
            const newData = { ...prevData };
            delete newData[requestId];
            return newData;
        });
        setSnackbar({ open: true, message: `Cererea pentru compania ${username} a fost refuzată!`, severity: 'error' });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div className="contractListContainer">
            {companyRequests.length === 0 ? (
                <div className="noRequestsMessage">
                    <p>Nu sunt cereri de companie la momentul actual</p>
                </div>
            ) : (
                companyRequests.map(request => (
                    <ContractContainer
                        key={request.id}
                        userData={containerData[request.id] || {}}
                        onAccept={() => handleAccept(request.id, containerData[request.id]?.username)}
                        onDeny={() => handleDeny(request.id, containerData[request.id]?.username)}
                    />
                ))
            )}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
