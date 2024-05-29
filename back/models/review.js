const {DataTypes} = require("sequelize")

module.exports = (db) =>{
    const review = db.define("review",{
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        score:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        message:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },{
        tableName: "review",
        timestamps:true,
    })
    return review;
}