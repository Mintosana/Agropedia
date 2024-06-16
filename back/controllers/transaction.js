const { transactionDb, producerDb, saleDb } = require('../models');

const transactionController = {
    createTransaction: async (req, res) => {
        try {
            const transactionData = {
                quantity: req.body.quantity,
                userId: req.body.userId,
                announcementId: req.body.announcementId,
                message: req.body.message,
                status: req.body.status,
            }
            console.log(transactionData);
            if (!transactionData.quantity || !transactionData.userId || !transactionData.announcementId) {
                res.status(400).send("Eroare : Nu au fost primite toate datele");
            }
            else {
                await transactionDb.create(transactionData);
                res.status(200).send(transactionData)
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: "Eroare de la server!!" })
        }
    },
    getAllTransactionsById: async (req, res) => {
        try {
            const userId = req.params.id;
            const transactions = await transactionDb.findAll({
                where:{
                    userId : userId,
                },
                order:[
                    ['createdAt','DESC']
                ],
            })
            if(transactions.length !== 0){
                res.status(200).send(transactions);
            }
            else{
                res.status(404).send({message:"Acest utilizator nu a initiat nici o tranzactie!"});
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: "Eroare de la server!!" })
        }
    },

    getAllPendingTransactionsById: async (req, res) => {
        try {
            const transactions = [];
            const userId = req.params.id;
            const producator = await producerDb.findOne({
                where: {
                    userId: userId
                }
            })
            const sale = await saleDb.findAll({
                where: {
                    producerId: producator.id,
                },
                order:[
                    ['createdAt','DESC']
                ],
            })

            const transactionPromises = sale.map(async (element) => {
                const transaction = await transactionDb.findAll({
                    where: {
                        announcementId: element.id,
                        status: "pending",
                    }
                });
                transactions.push(...transaction);
            });
            await Promise.all(transactionPromises);


            if (transactions.length !== 0) {
                res.status(200).send(transactions);
            }
            else {
                res.status(204).send("Nu exista nici o tranzactie in desfasurare initializate de utilizator");
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: `${err}`})
        }
    },

    acceptTransaction: async (req, res) => {
        try{
            const transactionId = req.params.id;
            const transaction = await transactionDb.findOne({
                where: {
                    id: transactionId
                }
            });
            if (transaction.status === 'pending') {
                await transactionDb.update(
                    { status: 'accepted' },
                    {
                        where: {
                            id: transactionId,
                        },
                    },
                ); // total = 1000 , transaction = 200
                const sale = await saleDb.findOne({
                    where:{
                        id : transaction.announcementId,
                }})
                if(sale.totalQuantity - transaction.quantity >= 0){
                    await saleDb.increment({ totalQuantity: -transaction.quantity}, {where: {id: transaction.announcementId}});
                    res.status(200).send(`Tranzactia cu id-ul ${transactionId} a fost acceptata`);
                }
                else{
                    res.status(400).send("Nu se poate rezolva tranzactia, cantitatea este epuizata!");
                    //return;
                }    
            }
            else{
                res.status(400).send("Tranzactia nu a putut fi modificata!")
            }
        }catch (err) {
            console.log(err);
            res.status(500).send({ message: "Eroare de la server!!" })
        }  
    },

    rejectTransaction: async (req, res) => {
        try{
            const transactionId = req.params.id;
            const transaction = await transactionDb.findOne({
                where: {
                    id: transactionId
                }
            });
            if (transaction.status === 'pending') {
                await transactionDb.update(
                    { status: 'rejected' },
                    {
                        where: {
                            id: transactionId,
                        },
                    },
                );
                res.status(200).send(`Tranzactia cu id-ul ${transactionId} a fost refuzata`);
            }
            else{
                res.status(400).send("Tranzactia nu a putut fi modificata!")
            }
        }catch (err) {
            console.log(err);
            res.status(500).send({ message: "Eroare de la server!!" })
        }  
    }

}

module.exports = transactionController;