const {DataTypes} = require("sequelize");
module.exports = (db) =>{
    const user = db.define("user",{
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true,
        },     
        name:{
            type : DataTypes.STRING,
            allowNull : false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        location:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        userType:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    }, {
        tableName: 'User',
        timestamps: true,
    })
    return user;
}