var Sequelize = require('sequelize');
var sequelize = new Sequelize('kinghorntek', 'postgres', '68nova', {
    host: process.env.POSTGRESQL_LOCAL_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    define: {
        timestamps: false
    },
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});
module.exports = sequelize