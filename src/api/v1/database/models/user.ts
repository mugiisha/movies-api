import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from "sequelize";
import { sequelize } from ".";



class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
}

// User.belongsTo(User, {foreignKey: 'userId'}); // this works too
// this configures the `userId` attribute.
// User.belongsTo(User);

// therefore, `userId` doesn't need to be specified here.
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { sequelize, modelName: "User", tableName: "users", timestamps: true }
);

export default User;
