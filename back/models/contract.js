const { DataTypes } = require("sequelize");

module.exports = (db) => {
    const contract = db.define("contract", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        contractData: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },
        contractState: {
            type:DataTypes.INTEGER,
            defaultValue: 0,
        },
        companyName:{
            type: DataTypes.STRING,
            allowNull:true,
        }
    }, {
        tableName: "Contract",
        timestamps: true,
    });
    return contract;
}
