const { transactionDb,producerDb,saleDb} = require('../models'); 

const transactionController = {
    createTransaction: async (req,res) =>{
        try{
            const transactionData = {
                quantity : req.body.quantity,
                userId : req.body.userId,
                announcementId : req.body.announcementId,
                message : req.body.message,
            }
            console.log(transactionData);
            if(!transactionData.quantity || !transactionData.userId || !transactionData.announcementId){
                res.status(400).send("Eroare : Nu au fost primite toate datele");
            }
            else{
                await transactionDb.create(transactionData);
                res.status(200).send(transactionData)
            }
        }
        catch(err){
            console.log(err);
            res.status(500).send({message:"Eroare de la server!!"})
        } 
    },
    getAllTransactionsById: async (req,res) => {
        try{
            //primesc announcement ID-ul
            const transactions = [];
            const userId = req.params.id;
            const producator = await producerDb.findOne({
                where:{
                    userId : userId
                }
            })
            const sale = await saleDb.findAll({
                where:{
                    producerId: producator.id,
                }
            })

            const transactionPromises = sale.map(async (element) => {
                const transaction = await transactionDb.findAll({
                    where: {
                        announcementId: element.id
                    }
                });
                transactions.push(...transaction);
            });
            await Promise.all(transactionPromises);
            
            
            if(transactions.length !== 0){
                res.status(200).send(transactions);
            }
            else{
                res.status(204).send("Nu exista nici o tranzactie initiata la anunturile utilizatorului");
            }   
        }
        catch(err){
            console.log(err);
            res.status(500).send({message:"Eroare de la server!!"})
        } 
    }
   
}

module.exports = transactionController;