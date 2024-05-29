import './transactionList.css';
export default function TransactionList(props){
    console.log(props.children)
    return (
        <div  className="transactionComponent">
            <h3>Tranzactii Necompletate:</h3>
            {props.children.length !== 0 ? props.children : <p>Nu exista tranzacții la momentul actual!</p>}
        </div>
    )
}