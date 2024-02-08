import axios from "axios";

const apiUrl = 'https://api.themoviedb.org/3/search/multi';
const apiKey = "2c1a7fb680343ffb6ce5ec7eadffd694";// Replace 'YOUR_API_KEY' with your actual API key
const query = "disney";
const includeAdult = false;
const language = 'en-US';
const page = 1;

export class Search {
  searchMulti() {
    let searchMulti: Object;
    axios({
      method: "get",
      //url:"https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1&APIKEY=${APIKEY}",
      url:apiUrl,
      params:{
                query,
                include_adult: includeAdult,
                language,
                page,
                api_key: apiKey
      },
      responseType: "json",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzFhN2ZiNjgwMzQzZmZiNmNlNWVjN2VhZGZmZDY5NCIsInN1YiI6IjY1YmQwOGIwY2ZmZWVkMDE2M2FlMzEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ItKd1zgNVGdGOvYIMo_y4Udb4Ev546FJSew0p-fioFM",
      },
    }).then((res) => {
        res.data = searchMulti;
        console.log(searchMulti);
    })
    .catch(error=>{
      console.log("There was a problem with the Axios request:", error)
    });
  }
}