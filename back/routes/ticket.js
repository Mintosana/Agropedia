const express = require('express');
const ticketController = require('../controllers').ticketController;

const router = express.Router();

router.get("/getAllTickets",ticketController.getAllTickets);
router.post("/createTicket",ticketController.createTicket);
router.put("/completeTicketById/:id",ticketController.completeTicketById);


module.exports = router;