import {useState, useEffect} from 'react';
import './transactionCard.css';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export default function TransactionCard({transactionData,setModified}){
    const [clientData,setClientData] = useState({});
    const [saleData,setSaleData] = useState({});

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getUserById/${transactionData.userId}`)
        .then(res => res.json())
        .then(user => {
            setClientData(user);
        })
    },[])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/sale/getSaleById/${transactionData.announcementId}`)
        .then(res => res.json())
        .then(sale => {
            setSaleData(sale);
        })
    },[])

    const handleCheck = ()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/transaction/acceptTransaction/${transactionData.id}`,{
            method: "PATCH",
        });
        alert("Tranzactia a fost acceptata!");
        setModified(value => value + 1);
    }
    const handleDeny = ()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/transaction/rejectTransaction/${transactionData.id}`,{
            method: "PATCH",
        });
        alert("Tranzactia a fost refuzata!");
        setModified(value => value + 1);
    }


    const date = new Date(clientData.createdAt).toLocaleString(undefined, {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    return (
        <div className="individualTransactionCard" >
        <div className="transactionData">
        <p><b>Nume client</b>: {clientData.name} <br/>
        <b>Nr Telefon</b>: {clientData.phoneNumber} <br/>
        <b>Data cerere</b>: {date} <br/>
        <b>Cantitate Ceruta</b>: {transactionData.quantity} kg <br/>
        <b>Pret</b>: {saleData.price}</p>
        </div>
        <div className="transactionButtons">
            <IconButton onClick={handleCheck}>
            <CheckIcon/>
            </IconButton>
            
            <IconButton onClick={handleDeny}>
            <CloseIcon/>
            </IconButton>
        </div>
        </div>
        
    )
}