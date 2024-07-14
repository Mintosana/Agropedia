const {DataTypes} = require("sequelize");

module.exports = (db) =>{
    const land = db.define("land_plot",{
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        size:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        location:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        landType:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        treatment: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const treatmentList = this.getDataValue('treatment');
                if(treatmentList){
                    return this.getDataValue('treatment').split(';');
                }
                else return treatmentList;
                
            },
            set(val) {
                if(val){
                    this.setDataValue('treatment',val.join(';'));
                }      
            },
        },
        fertiliser: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const fertiliserList = this.getDataValue('fertiliser');
                if(fertiliserList){
                    return this.getDataValue('fertiliser').split(';');
                }
                else return fertiliserList;
                
            },
            set(val) {
                if(val){
                    this.setDataValue('fertiliser',val.join(';'));
                }
            },
        },
        imageData:{
            type: DataTypes.TEXT('medium'),
        },
    },{
        tableName: "Land_plot",
        timestamps:true,
    })
    return land;
}