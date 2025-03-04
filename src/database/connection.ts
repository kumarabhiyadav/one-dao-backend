import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 


const sequelize = new Sequelize(
   
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: 'postgres',
    logging: false, 
    pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const DataBaseConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
