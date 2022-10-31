module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'vnt'),
      user: env('DATABASE_USERNAME', 'vnt'),
      password: env('DATABASE_PASSWORD', 'iRaTRrenbqorNjYGjhlH@'),
      ssl: env.bool('DATABASE_SSL', false),
      charset: env('DATABASE_CHARSET', 'utf8mb4'),
    },
  },
});
