import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";
import FeedbackIcon from '@mui/icons-material/Feedback';
import "./ticketButton.css";

export default function TicketButton() {
    const [open, setOpen] = useState(false);
    const [ticketType, setTicketType] = useState('');
    const [ticketMessage, setTicketMessage] = useState('');
    const [error, setError] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError('');
        setTicketType('');
        setTicketMessage('');
    };

    const handleTypeChange = (event) => {
        setTicketType(event.target.value);
    };

    const handleMessageChange = (event) => {
        setTicketMessage(event.target.value);
    };

    const handleSubmit = async () => {
        if (!ticketType || !ticketMessage) {
            setError('Te rugăm să selectezi tipul tichetului și să introduci un mesaj.');
            return;
        }

        const ticketData = {
            ticketType: ticketType,
            feedback: ticketMessage,
            isCompleted: false,
            userId: localStorage.getItem("userId"),
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/ticket/createTicket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const result = await response.json();
            console.log('Ticket submitted successfully:', result);
            handleClose();
        } catch (error) {
            console.error('Error submitting ticket:', error);
            setError('A apărut o eroare la trimiterea tichetului.');
        }
    };

    return (
        <div>
            <Button
                className="ticketButton"
                variant="contained"
                startIcon={<FeedbackIcon />}
                size="large"
                onClick={handleClickOpen}
            >
                Trimite Tichet
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Trimite Tichet</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Te rugăm să selectezi tipul tichetului și să introduci mesajul tău.
                    </DialogContentText>
                    <FormControl fullWidth margin="normal" error={!!error && !ticketType}>
                        <InputLabel id="ticket-type-label">Tip Tichet</InputLabel>
                        <Select
                            labelId="ticket-type-label"
                            value={ticketType}
                            onChange={handleTypeChange}
                            label="Tip Tichet"
                        >
                            <MenuItem value="suport">Suport</MenuItem>
                            <MenuItem value="bug">Bug</MenuItem>
                            <MenuItem value="feedback">Feedback</MenuItem>
                        </Select>
                        {error && !ticketType && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                    <TextField
                        margin="normal"
                        label="Mesaj"
                        fullWidth
                        multiline
                        rows={4}
                        value={ticketMessage}
                        onChange={handleMessageChange}
                        error={!!error && !ticketMessage}
                        helperText={error && !ticketMessage ? error : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Anulează</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Trimite
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
