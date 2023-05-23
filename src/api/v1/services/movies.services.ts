import tmdb from "../utils/tmdb";

export class MovieService {
    public static async getMovies(){
        return await tmdb.get("/movie/top_rated");
    }

    public static async getMovieById(id:number){
        return await tmdb.get(`/movie/${id}`)
    }
}