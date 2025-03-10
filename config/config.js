require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: "postgresql://gestionAutos_owner:URtyFsr7j4SH@ep-wandering-grass-a5hdu7ks.us-east-2.aws.neon.tech/gestionAutos?sslmode=require",
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
};
