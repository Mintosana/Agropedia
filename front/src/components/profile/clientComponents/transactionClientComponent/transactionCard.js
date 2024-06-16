import { useState, useEffect } from 'react';
import './transactionCard.css';

export default function TransactionClientCard({ transactionData }) {
    const [saleData, setSaleData] = useState(null);
    const [producerData, setProducerData] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/sale/getSaleById/${transactionData.announcementId}`)
            .then(res => res.json())
            .then(saleData => {
                setSaleData(saleData);
            })
    }, [])

    useEffect(() => {
        if (saleData) {
            fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getUserByProducerId/${saleData.producerId}`)
                .then(res => res.json())
                .then(producerData => {
                    console.log(producerData)
                    setProducerData(producerData);
                })
        }
    }, [saleData])

    const date = new Date(transactionData.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return (
        <div className="individualTransactionCard" >
            <div className="transactionData">
                {
                    saleData && producerData && (
                        <p><b>Nume Producator</b>: {producerData.name} <br />
                            <b>Nr Telefon</b>: {producerData.phoneNumber} <br />
                            <b>Data cerere</b>: {date} <br />
                            <b>Produs</b>: {saleData.announcementTitle} <br />
                            <b>Cantitate Ceruta</b>: {transactionData.quantity} <br />
                            <b>Pret</b>: {saleData.price} <br />
                            <b>Stare tranzactie</b>: {transactionData.status} <br />
                        </p>

                    )
                }

            </div>
        </div>

    )
}