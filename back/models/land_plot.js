const {DataTypes} = require("sequelize");

module.exports = (db) =>{
    const land = db.define("land_plot",{
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        size:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        location:{
            type:DataTypes.STRING,
            allowNull:false,
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