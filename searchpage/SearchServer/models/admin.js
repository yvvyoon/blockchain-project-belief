module.exports = (sequelize, DataTypes) => {
    return sequelize.define('admin', {
        dept: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull: false,
        },
        total : {
            type : DataTypes.STRING(20),
            allowNull: false,
        }
    },
    {
        timestamps: false
    });
}