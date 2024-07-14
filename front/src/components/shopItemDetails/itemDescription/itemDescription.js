import { useState } from 'react'
import { Button, TextField } from '@mui/material';
import './itemDescription.css';

export default function ItemDescription({ itemData, availableQuantity, id }) {
    const [quantity, setQuantity] = useState(0);

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };
    const handleClick = () => {
        if (quantity > availableQuantity) {
            alert('Comanda depaseste cantitatea totala de produs! introdu alta valoare.')
        }
        else if (quantity <= 0) {
            alert('Nu poti face o comanda cu cantitate negativa sau 0, introdu o alta valoare');
        }
        else {
            alert(`Comanda ta de ${quantity} kg a fost trimisa catre producator. Producătorul va urma să vă contacteze`);
            const data = {
                quantity: quantity,
                userId: localStorage.getItem('userId'),
                announcementId: id,
                status: "pending",
            }
            console.log(data);
            fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/transaction/createTransaction`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(data),
            });
        }
    }

    return (
        <div className="mainComponent">
            <div className="imageComponent">
                <img src={itemData.imageData} />
            </div>
            <div className="buyComponent">
                <h1>{itemData.announcementTitle}</h1>
                <p>{itemData.description}</p>
                <div className="itemDetails">
                    <h3>{`${availableQuantity} kg disponibile`}</h3>
                    <h3>{`${itemData.price} RON/kg`}</h3>
                </div>
                <div className="buyZone">
                    <Button variant='contained' onClick={handleClick}>Achizitioneaza</Button>
                    <TextField label="Cantitate in Kg" type="number" size="small" onChange={handleChange}></TextField>
                </div>

            </div>
        </div>
    )
}