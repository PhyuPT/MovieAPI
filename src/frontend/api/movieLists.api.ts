import axios from "axios";
import dotenv from "dotenv";
dotenv.config()

export class MovieList {
  static async getTopRated() {
    const topRated = await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      responseType: "json",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
    return topRated?.data.results.map((x: any) => x.id);
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
}


//This class returns id values for upcoming movies, top rated movies etc as an array of integers.
//Test:
/*  MovieList.getNowPlaying()
  .then((text) => {
    console.log(text)
  })
  .catch((err) => {
    console.log(err)
  });  */