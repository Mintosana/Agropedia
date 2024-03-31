const db = require('../config/db');
const sequelize = require('sequelize');

const userModel = require('../models/user');
const userDb = userModel(db,sequelize);
const adminModel = require("../models/admin");
const adminDb = adminModel(db,sequelize);
const clientModel = require("../models/client");
const clientDb = clientModel(db,sequelize);
const companyModel = require('../models/company');
const companyDb = companyModel(db,sequelize);
const producerModel = require('../models/producer');
const producerDb = producerModel(db,sequelize);
const ticketModel = require("../models/ticket");
const ticketDb = ticketModel(db,sequelize);
const contractModel = require("../models/contract");
const contractDb = contractModel(db,sequelize);
const transactionModel = require("../models/transaction");
const transactionDb = transactionModel(db,sequelize);
const saleModel = require("../models/sale_announcement");
const saleDb = saleModel(db,sequelize);
const landModel = require("../models/land_plot");
const landDb = landModel(db,sequelize);
const productModel = require("../models/product");
const productDb = productModel(db,sequelize);

userDb.hasOne(adminDb);
adminDb.belongsTo(userDb,{
    foreignKey:{
        name:"userId",
        allowNull:false,
    }
});

userDb.hasOne(clientDb);
clientDb.belongsTo(userDb,{
    foreignKey:{
        name:"userId",
        allowNull:false,
    }
});

userDb.hasOne(companyDb);
companyDb.belongsTo(userDb,{
    foreignKey:{
        name:"userId",
        allowNull:false,
    }
});

userDb.hasOne(producerDb);
producerDb.belongsTo(userDb,{
    foreignKey:{
        name:"userId",
        allowNull:false,
    }
});

userDb.hasMany(ticketDb);
ticketDb.belongsTo(userDb,{
    foreignKey:{
        name:"userId",
        allowNull:false,
    }
})

companyDb.hasMany(contractDb);
contractDb.belongsTo(companyDb,{
    foreignKey:{
        name:"companyId",
        allowNull:false,
    }
})
producerDb.hasMany(contractDb);
contractDb.belongsTo(producerDb,{
    foreignKey:{
        name:"producerId",
        allowNull:false,
    }
})

productDb.hasMany(contractDb);
contractDb.belongsTo(productDb,{
    foreignKey:{
        name:"productId",
        allowNull:false,
    }
})

clientDb.hasMany(transactionDb);
transactionDb.belongsTo(clientDb,{
    foreignKey:{
        name:"clientId",
        allowNull:false,
    }
})

saleDb.hasMany(transactionDb);
transactionDb.belongsTo(saleDb,{
    foreignKey:{
        name:"announcementId",
        allowNull:false,
    }
});

productDb.hasMany(saleDb);
saleDb.belongsTo(productDb,{
    foreignKey:{
        name:"productId",
        allowNull:false
    }
});

producerDb.hasMany(saleDb);
saleDb.belongsTo(producerDb,{
    foreignKey:{
        name:"productId",
        allowNull:false,
    }
});

producerDb.hasMany(landDb);
landDb.belongsTo(producerDb,{
    foreignKey:{
        name:"producerId",
        allowNull:false,
    }
});

productDb.hasMany(landDb);
landDb.belongsTo(productDb,{
    foreignKey:{
        name:"productId",
        allowNull:false,
    }
});

module.exports = {
    userDb,
    adminDb,
    clientDb,
    companyDb,
    producerDb,
    ticketDb,
    contractDb,
    transactionDb,
    saleDb,
    landDb,
    productDb,
    db,
}