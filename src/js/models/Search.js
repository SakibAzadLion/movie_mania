import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        try {
            //1) Fetching data from api
            const res = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${this.query}&page=1&include_adult=false`);
            
            //2) Save searched movies into array
            this.result = res.data.results;
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Trending JS (getResult)');
        }
    }

    genreName (genres) {
        this.result.forEach(movie => {
            if(movie.genre_ids[0]) {
                //1) Find genre name by id
                const genre = genres.find(el => el.id === movie.genre_ids[0]);

                //2) Add genre to movie
                movie.genre = genre;            
            }else {
                //3) If there is no genre
                movie.genre = {id: 0, name:''};
            }
        });
    }
}