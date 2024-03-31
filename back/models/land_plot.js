const {DataTypes} = require("sequelize");

module.exports = (db) =>{
    const land = db.define("land_plot",{
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        size:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        temperature:{
            type:DataTypes.FLOAT,
            allowNull:true,
        },
        humidity:{
            type:DataTypes.FLOAT,
            allowNull:true,
        },
        landType:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },{
        tableName: "Land_plot",
        timestamps:true,
    })
    return land;
}