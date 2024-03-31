const {DataTypes} = require("sequelize");

module.exports = (db) =>{
    const transaction = db.define("transaction",{
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },{
        tableName:"Transaction",
        timestamps:true,
    })
    return transaction
}