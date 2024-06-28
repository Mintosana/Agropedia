const { companyDb } = require('../models');

const companyController = {
    getAllCompanies: async (req, res) => {
        try {
            const companies = await companyDb.findAll();
            res.status(200).send(companies);
        } catch (error) {
            console.error('Error fetching companies:', error);
            res.status(500).send({ message: "Server error" });
        }
    },

    getUnvalidatedCompanies: async (req, res) => {
        try {
            const companies = await companyDb.findAll({
                where: { isDocumentValidated: false }
            });
            res.status(200).send(companies);
        } catch (error) {
            console.error('Error fetching unvalidated companies:', error);
            res.status(500).send({ message: "Server error" });
        }
    },

    getCompanyByUserId: async (req,res) => {
        try{
            userId = req.params.id;
            
            if(userId){
               const company = await companyDb.findOne({
                    where:{
                        userId : userId
                    }
                })
                res.status(200).send(company);
            }
            else{
                res.status(400).send({message: "Nu exista o companie cu acest userId!"})
            }
        }
        catch(err){
            res.status(500).send({message: "Eroare de la server!"})
        }
        
    },

    deleteCompanyById: async (req, res) => {
        try {
            const companyId = req.params.id;
            const company = await companyDb.findByPk(companyId);

            if (!company) {
                return res.status(404).send({ message: "Company not found" });
            }

            await companyDb.destroy({ where: { id: companyId } });
            res.status(200).send({ message: "Company entry deleted successfully" });
        } catch (error) {
            console.error('Error deleting company:', error);
            res.status(500).send({ message: "Server error" });
        }
    },

    updateCompanyById: async (req, res) => {
        try {
            const companyId = req.params.id;
            const { documentName, isDocumentValidated, userId } = req.body;

            const company = await companyDb.findByPk(companyId);
            if (!company) {
                return res.status(404).send({ message: "Company not found" });
            }

            await companyDb.update(
                { documentName, isDocumentValidated, userId },
                { where: { id: companyId } }
            );

            res.status(200).send({ message: "Cererea cu acest Id nu a fost gasita!" });
        } catch (error) {
            console.error('Eroare la modificarea cererii', error);
            res.status(500).send(error);
        }
    },

    validateCompanyRequestById: async(req,res) =>{

        try{
            const companyId = req.params.id;
            const company = await companyDb.findByPk(companyId);
            if (!company) {
                return res.status(404).send({ message: "Cererea cu acest Id nu a fost gasita!" });
            }
            else if(company.isDocumentValidated == true){
                console.log("banana");
                return res.status(400).send({message: "Cererea a fost deja validata!"})
            }
    
            await companyDb.update(
                { isDocumentValidated:true },
                { where: { id: companyId } }
            );
            res.status(200).send({ message: "Cererea a fost validata cu success!" });
        }
        catch (error) {
            console.error('Eroare validarea', error);
            res.status(500).send(error);
        } 
    }
};

module.exports = companyController;
