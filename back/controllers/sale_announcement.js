const { Op } = require("sequelize");
const {saleDb} = require('../models');

const saleController = {
    createSale : async (req,res) =>{
        try{

            const saleData = {
                price: req.body.price,
                totalQuantity: req.body.totalQuantity,
                description: req.body.description,
                announcementTitle: req.body.announcementTitle,
                producerId:req.body.producerId,
                productId:req.body.productId,
                imageData:req.body.base64Image,
            } 
            if(
                !saleData.price || 
                !saleData.totalQuantity || 
                !saleData.productId || 
                !saleData.producerId || 
                !saleData.description || 
                !saleData.announcementTitle){
                res.status(400).send({message:"Un camp nu a fost completat!"})
            }
            else{
                await saleDb.create(saleData);
                res.status(200).send(saleData);
            }
            
        }
        catch(err){
            console.log(err);
            res.status(500).send({message:`Eroare de la server: ${err}`})
        } 
    },

    getAllSales: async(req,res) =>{
        try{
            const sales = await saleDb.findAll({
                where: {
                    totalQuantity:{
                        [Op.gt]: 0,
                    }
                }
            });
            res.status(200).send(sales);
        }
        catch(err){
            console.log(err);
            res.status(500).send({message:"Eroare de la server!!"});
        }
    },

    getSaleById: async(req,res) =>{
      try{
        givenId = req.params.id;
        const searchedSale = await saleDb.findOne({
            where:{
                id: givenId
            }
        })
        if(searchedSale){
            res.status(200).send(searchedSale);
        }
        else{
            res.status(404).send("Lotul de pamant cu id-ul specificat nu exista in baza de date!")
        }
      }
      catch(err){
            console.log(err);
            res.status(500).send({message:"Eroare de la server!!"});
      }  
    },

    deleteSale : async(req,res) => {
        try{
            const saleId = req.params.id;
            const searchedSale = await saleDb.findOne({
                where:{
                    id: saleId
                }
            })
            if(searchedSale){
                saleDb.destroy({
                    where:{
                        id : saleId,
                    }
                })
                res.status(200).send("Lotul de pamant a fost sters cu succes!")
            }
            else{
                res.status(404).send("Lotul de pamant cu id-ul specificat nu exista!")
            }
        }  
        catch(err){
            console.log(err);
            res.status(500).send({message:"Eroare de la server!!"});
        }
    }
}

module.exports = saleController;