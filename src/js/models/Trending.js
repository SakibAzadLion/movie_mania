import axios from 'axios';
import { key } from '../config';

export default class Trending {
    constructor (trend) {
        this.trend = trend;
    }

    async getMovies () {
        try {
            //1) Fetching data from api
            const res = await axios(`https://api.themoviedb.org/3/movie/${this.trend}?api_key=${key}&language=en-US&page=1&&append_to_response=genres`); 
            
            //2) Save movies into array
            this.result = res.data.results;
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Trending JS (getMovie)');    
        }
    }

    async getGenres () {
        try {
            //1) Fetch movie genres
            const genresRes = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
           
            //2) Save genres into array
            this.genres = genresRes.data.genres;
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Trending JS (getGenres)'); 
        }
    }

    getGenreName () {
        this.result.forEach(movie => {
            const genre = this.genres.find(el => el.id === movie.genre_ids[0]); //Get genre name by id
            movie.genre = genre; //Add genre to movie
        });
    }
}