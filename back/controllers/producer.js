const { producerDb, userDb } = require("../models");

const producerController = {
    getProducerByUserId: async (req,res) => {
        try{
            userId = req.params.userId;
            
            if(userId){
               producator = await producerDb.findOne({
                    where:{
                        userId : userId
                    }
                })
                res.status(200).send(producator);
            }
            else{
                res.status(400).send({message: "Nu exista un producator cu acest userId!"})
            }
        }
        catch(err){
            res.status(500).send({message: "Eroare de la server!"})
        }
        
    },
    //  MOMENTAN SE POATE SA FIE REDUNDANT, GANDESTE TE DACA IL TII
    getRatingByUserId: async(req,res) =>{
        try{
            userId = req.params.userId;
            
            if(userId){
               producator = await producerDb.findOne({
                    where:{
                        userId : userId
                    }
                })
                res.status(200).send(producator.rating);
            }
            else{
                res.status(400).send({message: "Nu exista un producator cu acest userId!"})
            }
        }
        catch(err){
            res.status(500).send({message: "Eroare de la server!"})
        }
    },

    getAllProducers: async (req, res) => {
        try {
            const producers = await producerDb.findAll();
            const users = await userDb.findAll();
            console.log(users);
            const producerList = producers.map((producer) => {
                const desiredUser = users.find((user) => user.id == producer.id);
                const data = {
                    id: producer.id,
                    name: desiredUser.name
                }
                return data;
            });
            res.status(200).send(producerList);
        } catch (err) {
            res.status(500).send({ message: "Eroare de la server!" });
        }
    },
}
module.exports = producerController;