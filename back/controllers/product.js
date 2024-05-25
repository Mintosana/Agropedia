const {productDb} = require("../models/index");

const productController = {
    createProduct: async(req,res)=>{
        try{
            const productData = {
                productName: req.body.name,
            }
            if(!productData.productName){
                res.status(400).send("Nu a fost introdus un nume pentru produs");
            }
            else{
                await productDb.create(productData);
                res.status(200).send(productData);
            }
        }
        catch(err){
            console.log(err);
            res.status(500).send({message:"Eroare de la server!!"})
        }
        
    },

    getAllProducts: async(req,res) =>{
        try{
            const products = await productDb.findAll();
            if(products === null){
                res.status(400).send("Nu au fost introduse inca produse in baza de date")
            }
            else{
                res.status(200).send(products);
            }

        }catch(err){
            console.log(err);
            res.status(500).send({message:"Eroare de la server!!"})
        }
    },

    getProductById: async(req,res) =>{
        try{
            const givenId = req.params.id;
            const product = await productDb.findOne({
                where:{
                    id: givenId,
                }
            })
            console.log(product);
            if(product === null){
                res.status(400).send("Nu am gasit produsul cu acest id")
            }
            else{
                res.status(200).send(product);
            }
        }
        catch(err){
            console.log(err);
            res.status(500).send({message:"Eroare de la server!!"})
        }
    }
}

module.exports = productController;