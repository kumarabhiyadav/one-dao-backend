import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/connection';


interface ProductAttributes {
    id: number;
    name: string;
    price: number;
    user: number

}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public price!: number;
    public user: number;






    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the Product model
Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,

    },

    user: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },


}, {
    sequelize,
    tableName: 'products',
});

export default Product;
