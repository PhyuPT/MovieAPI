import axios from "axios";
import dotenv from "dotenv";
import { Genre } from "./genres";
dotenv.config();

export class MovieList {
  static async getTopRated() {
    const topRated = await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/genre/movie/list?language=en",
      responseType: "json",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
    return topRated?.data.genres.map((x: any) => {
      return x.name;
    });
  }
  static async getPopular() {
    const popular = await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/popular",
      responseType: "json",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
    return popular?.data.results.map((x: any) => x.id);
  }
  static async getNowPlaying() {
    const nowPlaying = await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/now_playing",
      responseType: "json",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
    return nowPlaying?.data.results.map((x: any) => x.id);
  }
  static async getUpcoming() {
    const upcoming = await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/upcoming",
      responseType: "json",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
    return upcoming?.data.results.map((x: any) => x.id);
  }

  static async getMoivesByGenre(genre: Genre) {
    const genreNums = await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/genre/movie/list?language=en",
      responseType: "json",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
    let genreObj = genreNums.data.genres.filter((x: any) => {
      return x.name == genre;
    });
    let genreNumber = genreObj[0].id;

    const moviesByGenre = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreNumber}`,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
    return moviesByGenre.data.results.map((x: any) => x.id);;
  }
}

//This class returns id values for upcoming movies, top rated movies etc as an array of integers.
//It also returns the first page of search by genre. Genre works by querying valid genre string to get genre number,
//then you can send another query with that genre number
//Test:
/* MovieList.getMoivesByGenre("Action")
  .then((text) => {
    console.log(text);
  })
  .catch((err) => {
    console.log(err);
  });
 */