const configuration = () => ({
  PORT: parseInt(process.env.PORT) || 3001,
  DB_URL: process.env.DATABASE_URL,
  IS_PROD: process.env.NODE_ENV === `production`,
});

export default configuration;
