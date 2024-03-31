const {DataTypes} = require("sequelize");

module.exports = (db)=>{
    const company = db.define("company",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
        },
    },{
        tableName:"Company",
        timestamps:true,
    })
    return company;
}