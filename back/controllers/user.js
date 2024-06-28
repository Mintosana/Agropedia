const { userDb, producerDb, clientDb, companyDb } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async (req, res) => {
        try {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                userType: req.body.type,
                location: req.body.location,
            }

            if (!user.name || !user.email || !user.userType || !user.password || !user.phoneNumber) {
                res.status(400).send({ message: "Un camp nu este completat" });
            }
            else if (user.name.length < 3) {
                res.status(400).send({ message: "Numele este prea mic" });
            }
            else if (/^[0-9]+$/.test(user.name)) {
                res.status(400).send({ message: "Numele trebuie sa contina doar caractere!" });
            }
            else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
                res.status(400).send({ message: "Emailul furnizat nu este corect" });
            }
            else if (user.phoneNumber.length !== 10) {
                res.status(400).send({ message: "Numarul de telefon nu are lungimea potrivita!" });
            }
            else if (/^([^0-9]*)$/.test(user.phoneNumber)) {
                res.status(400).send({ message: "Numarul de telefon trebuie sa contina doar numere!" });
            }
            else {

                const possibleUser = await userDb.findOne({
                    where: { email: user.email }
                })
                if (!possibleUser) {

                    const salt = await bcrypt.genSalt();
                    user.password = await bcrypt.hash(user.password, salt);

                    const createdUser = await userDb.create(user);
                    if (createdUser.userType === "Producator") {
                        const producerUser = {
                            userId: createdUser.id,
                            rating: 5,
                        }
                        await producerDb.create(producerUser);
                    }
                    else {
                        const clientUser = {
                            userId: createdUser.id,
                        }
                        await clientDb.create(clientUser);
                    }
                    const jwtToken = jwt.sign({id: createdUser.id},process.env.JWT_SECRET,{
                            expiresIn: process.env.JWT_EXPIRE_TIME
                        })
                    res.cookie("jwtToken", jwtToken , {httpOnly:true ,maxAge : process.env.COOKIE_EXPIRE_TIME});
                    res.status(200).send(createdUser);
                }
                else {
                    res.status(400).send({ message: "Exista deja un utilizator inregistrat cu aceasta adresa de email" });
                }
            }
        }
        catch (error) {
            res.status(500).send({ message: "Eroare de la server!" });
            console.log(error);
        }
    },

    login: async (req, res) => {

        try {
            const userCredentials = {
                email: req.body.email,
                password: req.body.password,
            }

            if (!userCredentials.email || !userCredentials.password) {
                res.status(400).send({ message: "Un camp nu este completat" });
            }
            else {
                const storedUser = await userDb.findOne({
                    where: {
                        email: userCredentials.email,
                    }
                })
                const passwordValidation = await bcrypt.compare(
                    userCredentials.password,
                    storedUser.password
                )

                if (!storedUser) {
                    res.status(400).send({ message: "Utilizatorul specificat in credentiale nu exista!" })
                }
                else if (!passwordValidation) {
                    res.status(400).send({ message: "Email sau parola gresita!" })

                } else {
                    const jwtToken = jwt.sign({id: storedUser.id},process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_EXPIRE_TIME
                    })
                    res.status(200).send({ 
                        message: "Userul se poate loga!",
                        token : jwtToken, 
                        id: storedUser.id, 
                        type: storedUser.userType});
                }
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Eroare de la server!" });
        }

    },

    getAllUsers: async (req, res) => {
        try {
            const users = await userDb.findAll();
            res.status(200).send(users);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: "Eroare de la server!" });
        }

    },

    getUserById: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await userDb.findByPk(id);
            if (user === false) {
                res.status(404).send({ message: "Userul nu exista" });
            }
            res.status(200).send(user);
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },

    getUserByProducerId: async(req,res) =>{
        const producerId = req.params.id;
        try{
            const producerData = await producerDb.findOne({
                where:{
                    id: producerId
                }
            })
            if(producerData !== null){
                const userData = await userDb.findOne({
                    where:{
                        id: producerData.userId,
                    }
                })
                if(userData === null){
                    res.status(404).send("Utilizatorul cu acest id nu exista!")
                }
                else{
                    res.status(200).send(userData);
                }
            }
            else{
                res.status(404).send("Producatorul cu acest id nu exista!")
            }
           
        
        }
        catch(error){
            console.log(error);
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },

    getUserByCompanyId: async(req,res) =>{
        const companyId = req.params.id;
        try{
            const companyData = await companyDb.findOne({
                where:{
                    id: companyId
                }
            })
            if(companyData !== null){
                const userData = await userDb.findOne({
                    where:{
                        id: companyData.userId,
                    }
                })
                if(userData === null){
                    res.status(404).send("Utilizatorul cu acest id nu exista!")
                }
                else{
                    res.status(200).send(userData);
                }
            }
            else{
                res.status(404).send("Compania cu acest id nu exista!")
            }
           
        
        }
        catch(error){
            console.log(error);
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },

    updateUserById: async (req, res) => {
        const userId = req.params.id;
        const targetUser = await userDb.findByPk(userId);

        if (targetUser === null) {
            res.status(404).send({ message: "Userul nu exista" });
            return;
        }
        else {
            try {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    userType: req.body.type,
                    location: req.body.location,
                }

                await userDb.update(newUser,
                    {
                        where: {
                            id: userId,
                        }
                    })
                res.status(200).send({ message: "Utilizatorul a fost modificat!" })
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ message: "Eroare de la server!" })
            }

        }
    },

    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const targetUser = await userDb.findByPk(userId);

            if (targetUser === null) {
                res.status(404).send({ message: "Userul nu exista" });
                return;
            }

            await userDb.destroy({
                where: {
                    id: userId
                }
            })
            res.status(200).send({ message: "Userul a fost sters!" })
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Eroare de la server!" })
        }
    },

    updateUserToCompany: async (req, res) => {
        const userId = req.params.id;

        try {
            const targetUser = await userDb.findByPk(userId);
            if (targetUser === null) {
                res.status(404).send({ message: "Utilizatorul nu există" });
                return;
            }
            if (targetUser.userType === 'Companie') {
                res.status(400).send({ message: "Utilizatorul este deja de tip 'Companie'" });
                return;
            }
            await userDb.update({ userType: 'Companie' }, {
                where: { id: userId }
            });

            res.status(200).send({ message: "Utilizatorul a devenit de tipul Companie!" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Eroare de la server!" });
        }
    },

    sendCompanyDocuments: async (req, res) => {
        try {
            const userId = req.params.id;
            const file = req.file;

            if (!file) {
                return res.status(400).send({ message: "No file uploaded" });
            }

            // Create a new entry in the Company table
            const newCompanyEntry = {
                userId: userId,
                documentName:  `DocumentUtilizator_${userId}`,
                isDocumentValidated: false
            };

            await companyDb.create(newCompanyEntry);

            res.status(200).send({ message: "Company document uploaded and entry created successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}

module.exports = userController;