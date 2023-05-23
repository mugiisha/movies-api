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
import List from "./List";



class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  getLists!: BelongsToGetAssociationMixin<List>;
}

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

User.hasMany(List, {
  foreignKey: "userId",
})

List.belongsTo(User, {
  foreignKey: "userId",
})
