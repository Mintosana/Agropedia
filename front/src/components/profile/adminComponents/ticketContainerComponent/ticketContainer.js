import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Box, Divider } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./ticketContainer.css";

export default function TicketContainer({ ticket, onDelete }) {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getUserById/${ticket.userId}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserDetails(userData);
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [ticket.userId]);

    const markCompleted = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/ticket/completeTicketById/${ticket.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isCompleted: true }),
            });
            if (response.ok) {
                onDelete(ticket.id); 
            } else {
                console.error('Failed to mark ticket as completed');
            }
        } catch (error) {
            console.error('Error marking ticket as completed:', error);
        }
    };

    return (
        <Card className="ticketContainer" variant="outlined" sx={{ maxWidth: 400, margin: '1em', padding: '1em' }}>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    Tip Tichet: {ticket.ticketType}
                </Typography>
                <Divider sx={{ marginBottom: '1em' }} />
                <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', marginBottom: '0.5em' }}>
                    Mesaj:
                </Typography>
                <Typography variant="body2" component="p" sx={{ backgroundColor: '#f9f9f9', padding: '1em', borderRadius: '5px', marginBottom: '1em' }}>
                    {ticket.feedback}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    Creat la: {new Date(ticket.createdAt).toLocaleString()}
                </Typography>
                {userDetails && (
                    <Box sx={{ marginBottom: '1em' }}>
                        <Typography variant="body2" component="p">
                            Nume utilizator: {userDetails.name}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Număr telefon: {userDetails.phoneNumber}
                        </Typography>
                    </Box>
                )}
                {!ticket.isCompleted && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={markCompleted}
                        startIcon={<CheckCircleIcon />}
                        sx={{ textTransform: 'none' }}
                    >
                        Marchează ca completat
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
