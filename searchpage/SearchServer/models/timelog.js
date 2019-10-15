module.exports = (sequelize, DataTypes) => {
    return sequelize.define('timelog', {
        number: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        date: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
    },
    {
        timestamps: false
    });
}