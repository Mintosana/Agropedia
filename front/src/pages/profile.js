import Header from "../components/header/header";
import TransactionList from "../components/profile/transactionList/transactionList";
import TransactionCard from "../components/profile/transactionCard/transactionCard";
import {useState,useEffect} from 'react';

export default function Profile(){
    const [transactions,setTransactions] = useState([]);
    const [modified,setModified] = useState(0);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/transaction/getAllPendingTransactionsById/${localStorage.getItem('userId')}`)
        .then(res => res.json())
        .then(transactionList => {
            setTransactions(transactionList);
        })
        .catch(error =>{
            console.error("Eroare la primirea tranzactiilor:", error);
            setTransactions([]);
        })
    },[modified])
    return(
        <>
        <Header></Header>
        <h2>Profil lmao</h2>
        {localStorage.getItem('type') == "Producator" &&
        <TransactionList>
        {transactions.map(transaction => <TransactionCard key={transaction.id} transactionData={transaction} setModified={setModified}></TransactionCard>)}
        </TransactionList>
        }
        
        </>
    )
}