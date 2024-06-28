import Header from "../components/header/header";
import TransactionList from "../components/profile/producerComponents/transactionList/transactionList";
import TransactionCard from "../components/profile/producerComponents/transactionCard/transactionCard";
import ProfileComponent from "../components/profile/profileComponent/profileComponent";
import TransactionClientHistory from "../components/profile/clientComponents/transactionClientList/transactionClientHistory";
import TransactionClientCard from "../components/profile/clientComponents/transactionClientComponent/transactionCard";
import "./css/profile.css";

import { useState, useEffect } from 'react';
import ContractList from "../components/profile/producerComponents/contractList/contractList";
import TicketButton from "../components/ticketButton/ticketButton";

export default function Profile() {
    const [transactions, setTransactions] = useState([]);
    const [modified, setModified] = useState(0);
    const [userData, setUserData] = useState(null);
    const [uniqueProfileComponent, setUniqueProfileComponent] = useState(null);

    useEffect(() => {
        switch (localStorage.getItem("type")) {

            case "Producator": {
                fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/transaction/getAllPendingTransactionsById/${localStorage.getItem('userId')}`)
                    .then(res => res.json())
                    .then(transactionList => {
                        setTransactions(transactionList);
                    })
                    .catch(error => {
                        console.error("Eroare la primirea tranzactiilor:", error);
                        setTransactions([]);
                    })
                break;
            }
            case "Client": {
                fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/transaction/getAllTransactionsById/${localStorage.getItem('userId')}`)
                    .then(res => res.json())
                    .then(transactionList => {
                        setTransactions(transactionList);
                    })
                    .catch(error => {
                        console.error("Eroare la primirea tranzactiilor:", error);
                        setTransactions([]);
                    })

                break;
            }
        }
    }, [modified])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getUserById/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(userData => {
                setUserData(userData);
            })
    }, [])

    useEffect(() => {
        switch (localStorage.getItem("type")) {
            case "Producator": {
                setUniqueProfileComponent(
                    <div style={{display:'flex', flexDirection:'column',justifyContent:'space-around', alignItems:'center', gap:'2rem'}}>
                    <TransactionList>
                        {transactions.map(transaction => (
                            <TransactionCard
                                key={transaction.id}
                                transactionData={transaction}
                                setModified={setModified}
                            />
                        ))}
                    </TransactionList>
                    <ContractList></ContractList>
                    </div>
                );
                break;
            }
            case "Client": {
                setUniqueProfileComponent(
                    <TransactionClientHistory>
                        {transactions.map(transaction => (
                            <TransactionClientCard
                                key={transaction.id}
                                transactionData={transaction}
                            />
                        ))}
                    </TransactionClientHistory>
                );
                break;
            }
            default: {
                setUniqueProfileComponent(null);
                break;
            }
        }
    }, [transactions, modified]);

    return (
        <>
            <Header></Header>
            <div className="mainContainer">
                {userData && <ProfileComponent userData={userData} />}
                {uniqueProfileComponent}
            </div>
            <TicketButton></TicketButton>
        </>
    )
}