import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material';


import './css/shopItemDetails.css';
import Maps from '../components/maps/maps';

export default function ShopItemDetails() {
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const [quantity,setQuantity] = useState(0);
    const [availableQuantity,setAvailableQuantity] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/sale/getSaleById/${id}`)
            .then((promise) => {
                return promise.json()
            })
            .then((response) => {
                setItemData(response);
            })
    }, [])

    useEffect(() => {
        if (itemData) {
            setAvailableQuantity(itemData.totalQuantity);
        }
    }, [itemData]);

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };
    const handleClick = () =>{
        if(quantity <= availableQuantity){
            alert(`Comanda ta de ${quantity} kg a fost trimisa catre producator`);
            const data = {
                quantity : quantity,
                userId : localStorage.getItem('userId'),
                announcementId : id,
            }
            console.log(data);
            fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/transaction/createTransaction`,{
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(data), 
            });
        }
        else{
            alert('Comanda depaseste cantitatea totala de produs! introdu alta valoare.')
        }
    }
    

    return (
        <>
            {itemData && (
                <>
                    <div className="mainComponent">
                        <div className="imageComponent">
                            <img src='/rosii.jpeg' />
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
                    {/* <div className='locationComponent'>
                        <Maps></Maps>
                    </div> */}
                </>
            )}
        </>
    )
}