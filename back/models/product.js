const {DataTypes} = require("sequelize")

module.exports = (db) =>{
    const product = db.define("product",{
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        productName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },{
        tableName: "Product",
        timestamps:true,
    })
    return product;
}