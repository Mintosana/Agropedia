const {DataTypes} = require("sequelize");

module.exports = (db) =>{
    const ticket = db.define("ticket",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement: true,
        },
        ticketType:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        feedback:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        isCompleted:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        },
    },{
        tableName: 'Ticket',
        timestamps: true,
    }
    )
    return ticket;
}