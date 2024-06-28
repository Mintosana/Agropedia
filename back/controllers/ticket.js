const { ticketDb } = require("../models");

const ticketController = {
    createTicket: async (req, res) => {
        try {
            const ticketData = {
                ticketType: req.body.ticketType,
                feedback: req.body.feedback,
                isCompleted: false,
                userId: req.body.userId,
            }

            await ticketDb.create(ticketData);
            res.status(200).send(ticketData);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err });
        }
    },
    getAllTickets: async (req, res) => {
        try {
            const tickets = await ticketDb.findAll();
            if (tickets.length > 0) {
                res.status(200).send(tickets);
            }
            else {
                res.status(404).send({ message: "Nu exista tichete in baza de date" });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err });
        }
    },
    completeTicketById: async (req, res) => {
        try {
            const ticketId = req.params.id;
            const ticket = await ticketDb.findOne({
                where: {
                    id: ticketId,
                }
            });

            if (ticket != null) {
                if (ticket.isCompleted === true) {
                    res.status(400).send("Ticketul a fost deja completat!");
                }
                else {
                    await ticketDb.update(
                        { isCompleted: true },
                        {
                            where: {
                                id: ticketId,
                            }
                        })
                    res.status(200).send("Ticketul a fost completat!");
                }
            }
            else {
                res.status(404).send("Ticketul cu id-ul specificat nu a fost gasit!");
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err });
        }
    }
}

module.exports = ticketController;