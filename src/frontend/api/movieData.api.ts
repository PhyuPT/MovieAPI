import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export class MovieData {
  static async getMovieData(movieId: Number) {
    let fullMovieData = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos%2Cwatch%2Fproviders%2Ccredits&language=en-US`,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });

    let youtubeTrailers = fullMovieData.data.videos.results.filter((x:any)=>{return (x.site=="YouTube"&&x.type=="Trailer")});
    let watchProviders = fullMovieData.data["watch/providers"].results.CA?.flatrate;
    let cast = fullMovieData.data.credits.cast.filter((x:any) => {
      return (x.known_for_department == "Acting"&&x.order<5);
    }); //write code to limit results to ~ 10
      
    let movieData = {
      title: fullMovieData.data.title,
      releaseDate: fullMovieData.data.release_date,
      trailerIds: youtubeTrailers,
        watchProviders: watchProviders,
      cast:cast
    };
    return movieData;
  }
}

//test
 MovieData.getMovieData(66379)
   .then((text) => {
     console.log(text);
   })
   .catch((err) => {
     console.log(err);
   }); 
