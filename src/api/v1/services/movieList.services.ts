import {
  FindOptions,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import MovieList from "../database/associations/movieList";

class MovieListService {
  public static async getListMovies(listId: number) {
    const listMovies = await MovieList.findAll({
      where: {
        listId
      }
    });
    return listMovies;
  }
  public static async getSingleMovie(listId: number, movieId: number) {
    const listMovie = await MovieList.findOne({
      where: {
        listId,
        movieId
      }
    });
    return listMovie;
  }

  public static async addMovie(movieId: number, listId: number, rank: number) {
    const listMovie = await MovieList.create({
      movieId,
      listId,
      rank,
    });
    return listMovie;
  }

  public static async removeMovie(
    listId: number,
    movieId: number
  ): Promise<number> {
    const deletedMovie = await MovieList.destroy({
      where: {
        listId,
        movieId,
      },
    });
    return deletedMovie;
  }

  public static async updateRank(
    listId: number,
    movieId: number,
    rank: number
  ): Promise<any> {
    const movie = await MovieList.update(
      {
        rank: rank,
      },
      {
        where: {
          listId,
          movieId,
        },
      }
    );

    return movie;
  }
}

export default MovieListService;
