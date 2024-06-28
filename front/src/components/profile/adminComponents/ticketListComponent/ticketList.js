import { useEffect, useState } from 'react';
import "./ticketList.css";
import TicketContainer from '../ticketContainerComponent/ticketContainer';

export default function TicketList() {
    const [ticketList, setTicketList] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/ticket/getAllTickets`)
            .then(res => res.json())
            .then((res) => {
                const uncompletedTickets = res.filter(ticket => !ticket.isCompleted);
                setTicketList(uncompletedTickets);
            })
    }, [])

    const handleDelete = (ticketId) => {
        const updatedTickets = ticketList.filter(ticket => ticket.id !== ticketId);
        setTicketList(updatedTickets);
    };

    return (
        <div className="ticketListWrapper">
            <div className="ticketListComponent">
            <h1>Lista Tichete Necompletate!</h1>
                {ticketList && ticketList.map((ticket) => (
                    <TicketContainer key={ticket.id} ticket={ticket} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    )
}
