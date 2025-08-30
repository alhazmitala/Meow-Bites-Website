// src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Single Sequelize instance for the whole app
 * TLS is ON (Aiven requires it) but we rely on
 * Node's default root CAs, no custom ca.pem needed.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host   : process.env.DB_HOST,
    port   : Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: false,

    dialectOptions: {
      ssl: {
        // use built-in CAs; if it still complains on some machines,
        // flip rejectUnauthorized to false -- but try true first.
        rejectUnauthorized:false,
      },
    },
  },
);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅  Connected to Aiven MySQL');
  } catch (err) {
    console.error('❌  DB connection failed:', err.message);
    throw err;          // bubble up so the app exits
  }
};

module.exports = { sequelize, connectToDB };
