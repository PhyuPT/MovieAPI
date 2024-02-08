import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiUrl = 'https://api.themoviedb.org/3/search/multi';
const apiKey = "2c1a7fb680343ffb6ce5ec7eadffd694";// Replace 'YOUR_API_KEY' with your actual API key
const query = "disney";
const includeAdult = false;
const language = 'en-US';
const page = 1;

export class Search {
  static async searchMulti(query: String) {
    let searchMultiData = await axios({
      method: "get",
      //url:`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1&APIKEY=${apiKey}`,
      url: `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      /*url:apiUrl,
       params:{
                query,
                include_adult: includeAdult,
                language,
                page,
                api_key: apiKey
      }, */
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