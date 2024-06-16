import './transactionClientHistory.css';
export default function TransactionClientHistory(props){
    return (
        <div  className="transactionComponent">
            <h3>Istoric Tranzactii</h3>
            {props.children.length !== 0 ? props.children : <p>Nu exista tranzacții la momentul actual!</p>}
        </div>
    )
}