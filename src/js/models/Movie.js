import axios from 'axios';
import { key } from '../config';

export default class Movie {
    constructor (id) {
        this.id = id;
    }

    async getResult() {
        try {
            //1) Fetch single movie
            const res = await axios(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${key}&language=en-US&append_to_response=credits,videos`);
            
            //2) Save movie data into variable
            this.title = res.data.title;
            this.imdb_rating = res.data.vote_average;
            this.runtime = res.data.runtime;
            this.overview = res.data.overview;
            this.poster = res.data.poster_path;
            this.trailer = res.data.videos.results.length > 0 ? res.data.videos.results[0].key : '404';
            this.cast = res.data.credits.cast.slice(0, 9);
            this.genres = res.data.genres.map(el => el.name);
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Movie JS (getResult)');
        }
    }

    calcRating() {
        //1) Calulate movie rating for stars
        const rating = (this.imdb_rating / 10) * 5;

        //2) Save rating into variable
        this.rating = rating.toFixed(1);
    }
}