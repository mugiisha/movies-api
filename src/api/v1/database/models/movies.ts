import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { sequelize } from ".";
import List from "./List";
import MovieList from "../associations/movieList";

class Movie extends Model<
  InferAttributes<Movie>,
  InferCreationAttributes<Movie>
> {
  id!: number;
  title!:string;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "movies",
    timestamps: true,
  }
);

export default Movie;

Movie.belongsToMany(List, {
  through: MovieList,
  foreignKey: "movieId",
});

List.belongsToMany(Movie, {
  through: MovieList,
  foreignKey: "listId",
});
