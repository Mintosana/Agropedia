const {DataTypes} = require("sequelize");

module.exports = (db)=>{
    const announcement = db.define("announcement",{
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        totalQuantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },{
        tableName:"Sale_announcement",
        timestamps:true,
    })
    return announcement;
}