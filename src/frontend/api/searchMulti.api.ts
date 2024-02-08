import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export class Search {
  static async searchMulti(query: String) {
    let searchMultiData = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    })
    return searchMultiData.data.results.map((x:any)=>{return x.id});
  }
}


//test
  Search.searchMulti("Disney")
   .then((text) => {
     console.log(text);
   })
   .catch((err) => {
     console.log(err);
   });