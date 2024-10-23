import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/connection';


interface OTPAttributes {
  id: number;
  otp: number;
  email: string;
  createdAt: Date;
 
}

interface OTPCreationAttributes extends Optional<OTPAttributes, 'id'> { }

class OTP extends Model<OTPAttributes, OTPCreationAttributes> implements OTPAttributes {
  public id!: number;
  public otp!: number;
  public email!: string;
  



  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the OTP model
OTP.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
 

}, {
  sequelize,
  tableName: 'otp',
});

export default OTP;
