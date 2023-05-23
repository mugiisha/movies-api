import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { sequelize } from "../models";

class MovieList extends Model<
  InferAttributes<MovieList>,
  InferCreationAttributes<MovieList>
> {
  movieId!: number;
  listId!: number;
  rank!: number;
}

MovieList.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    listId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MovieList",
    tableName: "movielist",
    timestamps: false,
  }
);

export default MovieList;
