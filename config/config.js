/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    define: {
      freezeTableName: true,
    },
    seederStorage: 'sequelize',
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    define: {
      freezeTableName: true,
    },
    seederStorage: 'sequelize',
    dialect: 'postgres',
  },
};
