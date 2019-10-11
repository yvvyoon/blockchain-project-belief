module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: false
        },
        number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        time: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        timestamps: false
    });
}