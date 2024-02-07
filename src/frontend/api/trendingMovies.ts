import axios from "axios";

export class TrendingMovieList {
  getTrendingMovies() {
    let trendingmovies: Object;
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      responseType: "json",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzFhN2ZiNjgwMzQzZmZiNmNlNWVjN2VhZGZmZDY5NCIsInN1YiI6IjY1YmQwOGIwY2ZmZWVkMDE2M2FlMzEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ItKd1zgNVGdGOvYIMo_y4Udb4Ev546FJSew0p-fioFM",
      },
    }).then((res) => {
        res.data = trendingmovies;
        console.log(trendingmovies);
    });
  }
}
