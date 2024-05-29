const { producerDb } = require("../models");

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
}
module.exports = producerController;