const {DataTypes} = require("sequelize")

module.exports = (db)=>{
    const client = db.define("client",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        }
    },{
        tableName:"Client",
        timestamps:true,
    })
    return client;
}