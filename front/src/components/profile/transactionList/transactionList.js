
import './transactionList.css';
export default function TransactionList(props){
    return (
        <div  className="transactionComponent">
            <h3>Tranzactii Necompletate:</h3>
            {props.children}
        </div>
    )
}