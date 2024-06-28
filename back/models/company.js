const { DataTypes } = require('sequelize');

module.exports = (db) => {
    const Company = db.define('company', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        documentName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isDocumentValidated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'Company',
        timestamps: true,
    });

    return Company;
};
