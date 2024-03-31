const {DataTypes} = require("sequelize");

module.exports = (db)=>{
    const admin = db.define("admin",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },     
    },{
        tableName:"Admin",
        timestamps:true,
    })
    return admin;
}