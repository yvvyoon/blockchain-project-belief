module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        pw : {
            type : DataTypes.STRING(20),
            allowNull: false,
        },
        admin : {
            type : DataTypes.STRING(20),
            allowNull: false,
        },
        dept: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        timestamps: false
    });
}