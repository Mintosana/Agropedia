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
        },
        announcementTitle:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        imageData:{
            type: DataTypes.TEXT,
        }
    },{
        tableName:"Sale_announcement",
        timestamps:true,
    })
    return announcement;
}