const env = require('./env');

const commonConfig = {
  define: {
    freezeTableName: true,
  },
  logging: env.NODE_ENV === 'development' ? false : false,
};

const dbConfig =
  env.DB_DIALECT === 'sqlite'
    ? {
        dialect: 'sqlite',
        storage: env.DB_STORAGE,
        ...commonConfig,
      }
    : {
        dialect: 'mysql',
        host: env.DB_HOST,
        port: env.DB_PORT,
        database: env.DB_NAME,
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        timezone: '+00:00',
        dialectOptions: {
          decimalNumbers: true,
        },
        pool: {
          max: 20,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        ...commonConfig,
      };

module.exports = dbConfig;
