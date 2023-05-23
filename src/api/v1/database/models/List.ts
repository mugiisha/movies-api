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
import User from "./user";

class List extends Model<InferAttributes<List>, InferCreationAttributes<List>> {
  id!: number;
  name!: string;
  userId!: number;
  getUser!: BelongsToGetAssociationMixin<User>;
}

List.init(
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "List",
    tableName: "lists",
    timestamps: true,
  }
);

export default List;
