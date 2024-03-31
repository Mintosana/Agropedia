const {DataTypes} = require("sequelize");

module.exports = (db)=>{
    const producer = db.define("producer",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:true,
            autoIncrement:true,
        },
        rating:{
            type:DataTypes.FLOAT,
            allowNull:false,
            defaultValue:5.0,
        },

    },{
        tableName:"Producer",
        timestamps:true,
    })
    return producer;
}