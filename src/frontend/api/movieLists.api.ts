import axios from "axios";

export class MovieList {
  getTopRated() {
    let topRated: Object;
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      responseType: "json",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzFhN2ZiNjgwMzQzZmZiNmNlNWVjN2VhZGZmZDY5NCIsInN1YiI6IjY1YmQwOGIwY2ZmZWVkMDE2M2FlMzEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ItKd1zgNVGdGOvYIMo_y4Udb4Ev546FJSew0p-fioFM",
      },
    }).then((res) => {
        res.data = topRated;
        console.log(topRated);
    });
  }
}
