const {DataTypes} = require("sequelize")

module.exports = (db) =>{
    const contract = db.define("contract",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },{
        tableName:"Contract",
        timestamps:true,
    })
    return contract;
}