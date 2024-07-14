import './simpleDataComponent.css';
import { useState, useEffect } from 'react';

export default function SimpleDataComponent() {
    const [numUsers, setNumUsers] = useState(0);
    const [numTransactions, setNumTransactions] = useState(0);
    const [numSales, setNumSales] = useState(0);

    useEffect(() => {
        fetch('http://localhost:1234/api/user/getAllUsers')
            .then(res => res.json())
            .then(res => {
                setNumUsers(res.length);
            });

        fetch('http://localhost:1234/api/transaction/getAllTransactions')
            .then(res => res.json())
            .then(res => {
                setNumTransactions(res.length);
            });

        fetch('http://localhost:1234/api/sale/getAllSales')
            .then(res => res.json())
            .then(res => {
                setNumSales(res.length);
            });
    }, []);

    return (
        <div className="mainDataComponent">
            <h4>Numar anunturi totale : {numSales}</h4>
            <h4>Numar tranzactii totale : {numTransactions}</h4>
            <h4>Numar utilizatori : {numUsers}</h4>
        </div>
    );
}
