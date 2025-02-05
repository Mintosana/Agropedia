const { landDb, producerDb, productDb } = require('../models');

const landController = {
    getAllLand: async (req, res) => {
        try {
            const plots = await landDb.findAll();
            res.status(200).send(plots);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: "Eroare de la server!" });
        }

    },

    getPlotsByUserId: async (req, res) => {
        try {
            const id = req.params.id; // id-ul userului, nu al producatorului
            const producer = await producerDb.findOne({
                where: {
                    userId : id,
                }
            })
            const plots = await landDb.findAll({
                where: {
                    producerId: producer.id,

                }
            });
            if (plots.length === 0) {
                res.status(404).send({ message: "Userul cu id-ul specificat nu are nici un lot de pamant", status:404 });
            }
            else {
                res.status(200).send(plots);
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },


    createPlot: async (req, res) => {
        try {
            const plot = {
                name : req.body.name,
                size: req.body.size,
                landType: req.body.landType,
                location: req.body.location,
                producerId: req.body.producerId,
                productId: req.body.productId,
                imageData: req.body.imageData,
            }
            
            assignedProducer = await producerDb.findAll({
                where: {
                    id: plot.producerId,
                }
            })
            assignedProduct = await productDb.findAll({
                where: {
                    id: plot.productId,
                }
            })
            if (assignedProducer.length === 0) {
                res.status(400).send({
                     message: "Producatorul asignat lotului de pamant nu exista in baza de date" 
                    });
            }
            else if (assignedProduct.length === 0) {
                res.status(400).send({
                     message: "Produsul asignat lotului de pamant nu exista in baza de date" 
                    });
            }
            else {
                const createdPlot = await landDb.create(plot);
                console.log(createdPlot);
                res.status(200).send(createdPlot);
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },

    updatePlotById: async (req, res) => {
        const plotId = req.params.id;
        const targetPlot = await landDb.findByPk(plotId);

        if (targetPlot === null) {
            res.status(404).send({ message: "Lotul de pamant nu exista" });
            return;
        }
        else {
            try {
                const newPlot = {
                    name: req.body.name,
                    size: req.body.size,
                    landType: req.body.landType,
                    location:req.body.location,
                    producerId: req.body.producerId,
                    productId: req.body.productId,
                    imageData:req.body.imageData,
                    fertiliser:req.body.fertilisers ? req.body.fertilisers : null,
                    treatment:req.body.treatments ? req.body.treatments : null,
                }

                console.log(newPlot);

                assignedProducer = await producerDb.findAll({
                    where: {
                        id: newPlot.producerId,
                    }
                })
                assignedProduct = await productDb.findAll({
                    where: {
                        id: newPlot.productId,
                    }
                })
                if (assignedProducer.length === 0) {
                    res.status(400).send({ 
                        message: "Producatorul asignat lotului de pamant nu exista in baza de date" 
                    });
                }
                else if (assignedProduct.length === 0) {
                    res.status(400).send({
                         message: "Produsul asignat lotului de pamant nu exista in baza de date" 
                        });
                }
                else {
                    await landDb.update(newPlot, {
                        where: {
                            id: plotId,
                        }
                    });
                    res.status(200).send({ message: "Lotul de pamant a fost modificat!" });
                }
            }
            catch (error) {
                console.log(error)
                res.status(500).send({ message: error});
            }
        }
    },
    deletePlotById: async(req,res) => {
        try{
            const landId = req.params.id;
            const targetPlot = await landDb.findByPk(landId);
            if(targetPlot === null){
                res.status(404).send({ message: "Lotul de pamant nu exista" });
                return;
            }

            await landDb.destroy({
                where:{
                    id:landId
                }
            })
            res.status(200).send({ message: "Lotul de pamant a fost sters!" })
        }
        catch(error){
            console.log(error);
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },
}

module.exports = landController