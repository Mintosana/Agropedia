import React, { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Box, Typography } from '@mui/material';

export default function CompanyStatisticsComponent() {
    const [contractData, setContractData] = useState([0, 0, 0]);
    const [dailyData, setDailyData] = useState([]);
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/contract/getAllContractsByUserId/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(res => {
                setContractData(res[1]);
                console.log(res[1]);
                processContracts(res[0]);
            });
    }, []);

    const processContracts = (contracts) => {
        const dateMap = contracts.reduce((acc, contract) => {
            const date = new Date(contract.createdAt).toLocaleDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        const sortedDates = Object.keys(dateMap).sort();
        const data = sortedDates.map(date => ({
            date,
            count: dateMap[date]
        }));

        setDailyData(data);
        setContracts(contracts);
    };

    const doughnutData = {
        labels: ['Pending', 'Accepted', 'Refused'],
        datasets: [
            {
                label: 'Contract Status',
                data: contractData,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)', // Pending
                    'rgba(75, 192, 192, 0.2)', // Accepted
                    'rgba(255, 99, 132, 0.2)'  // Refused
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: dailyData.map(item => item.date),
        datasets: [
            {
                label: 'Number of Contracts',
                data: dailyData.map(item => item.count),
                backgroundColor: 'rgba(75, 192, 75, 0.6)',
                borderColor: 'rgba(75, 192, 75, 1)',
                borderWidth: 1,
            },
        ],
    };

    const doughnutOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    const barOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <Box 
            sx={{
                backgroundColor: 'white',
                borderRadius: '16px',
                width: '80rem',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h5" component="h1" align="center" gutterBottom>
                Numar contracte eliberate
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', mb: 4 }}>
                <Box sx={{ width: '25rem', height: '25rem' }}>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                </Box>
                <Box sx={{ width: '25rem', height: '25rem' }}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Contracte eliberate pe zile
                    </Typography>
                    <Bar data={barData} options={barOptions} />
                </Box>
            </Box>
        </Box>
    );
}
