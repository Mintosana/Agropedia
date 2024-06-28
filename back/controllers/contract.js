const { contractDb, companyDb } = require('../models');

const contractController = {
    uploadContract: async (req, res) => {
        try {
            const contractBuffer = req.contractBuffer;
            const producerId = req.body.producerId;
            const companyId = req.body.companyId;


            await contractDb.create({
                contractData: contractBuffer,
                producerId: producerId,
                companyId: companyId,
                productId: 1,
            });

            res.status(200).send({ message: "Contractul a fost incarcat cu succes!" });
        } catch (error) {
            console.error('Eroare la incarcarea contractului:', error);
            res.status(500).send({ message: "Eroare de la server!" });
        }
    },

    downloadContract: async (req, res) => {
        try {
            const { contractId } = req.params;
            const contract = await contractDb.findByPk(contractId);

            if (!contract) {
                return res.status(404).send({ message: "Contractul nu a fost găsit!" });
            }

            const contractData = contract.contractData;
            const fileName = `contract-${contractId}.pdf`;

            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', 'application/pdf');

            res.send(contractData);
        } catch (error) {
            console.error('Error downloading contract:', error);
            res.status(500).send({ message: "Eroare de la server!" });
        }
    },

    getAllContractsByCompanyId: async (req, res) => {
        try {
            const companyId = req.params.id;
            const contracts = await contractDb.findAll({ where: { companyId: companyId, contractState: 0 } });

            if (contracts.length === 0) {
                return res.status(404).send({ message: "Această companie nu are nici un contract!" });
            }

            res.status(200).send(contracts);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Eroare de la server!" });
        }
    },

    getAllContractsByProducerId: async (req, res) => {
        try {
            const producerId = req.params.id;
            const contracts = await contractDb.findAll({
                where: {
                    producerId: producerId,
                    contractState: 0
                },
                attributes: { exclude: ['contractData'] }
            });

            if (contracts.length === 0) {
                return res.status(404).send({ message: "No contracts found for this producer!" });
            }

            res.status(200).send(contracts);
        } catch (error) {
            console.error('Error fetching contracts by producerId:', error);
            res.status(500).send({ message: "Server error!" });
        }
    },

    getAllContractsByProductId: async (req, res) => {
        try {
            const productId = req.params.id;
            const contracts = await contractDb.findAll({ where: { productId } });

            if (contracts.length === 0) {
                return res.status(404).send({ message: "No contracts found for this product!" });
            }

            res.status(200).send(contracts);
        } catch (error) {
            console.error('Error fetching contracts by productId:', error);
            res.status(500).send({ message: "Server error!" });
        }
    },

    getAllContractsByUserId: async (req, res) => {
        try {
            const userId = req.params.id;
            const companyId = await companyDb.findOne({ where: { userId }, attributes: ['id'] });
            if (companyId) {
                const contracts = await contractDb.findAll({ where: { companyId: companyId.id }, attributes: { exclude: ['contractData'] } });
                const contractStatusData = [0, 0, 0];
                contracts.forEach(contract => {
                    contractStatusData[contract.contractState]++;
                })
                res.status(200).send([contracts, contractStatusData]);
            }
            else{
                res.status(400).send("nu exista o companie cu id-ul specificat!")
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    acceptContractById: async (req, res) => {
        try {
            const contractId = req.params.id;
            const contractObject = await contractDb.findByPk(contractId);
            if (contractObject) {
                if (contractObject.contractState === 0) {
                    await contractDb.update(
                        { contractState: 1 }, { where: { id: contractId } }
                    )
                    res.status(200).send(contractObject);
                }
                else {
                    res.status(404).send("starea contractului deja a fost modificata!");
                }
            }
            else {
                res.status(404).send("contractul cu id-ul cerut nu exista!");
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    refuseContractById: async (req, res) => {
        try {
            const contractId = req.params.id;
            const contractObject = await contractDb.findByPk(contractId);
            if (contractObject) {
                if (contractObject.contractState === 0) {
                    await contractDb.update(
                        { contractState: 2 }, { where: { id: contractId } }
                    )
                    res.status(200).send(contractObject);
                }
                else {
                    res.status(404).send("starea contractului deja a fost modificata!");
                }
            }
            else {
                res.status(404).send("contractul cu id-ul cerut nu exista!");
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
};

module.exports = contractController;
