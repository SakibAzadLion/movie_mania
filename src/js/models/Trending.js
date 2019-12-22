import axios from 'axios';
import { key } from '../config';

export default class Trending {
    constructor (region = 'popular') {
        this.region = region;
    }

    async getMovie () {
        const res = await axios(`https://api.themoviedb.org/3/movie/${this.region}?api_key=${key}&language=en-US&page=1&&append_to_response=genres`);
        // console.log(res.data.results);
        this.result = res.data.results;
    }

    async getGenres () {
        const genresRes = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
        this.genres = genresRes.data.genres;
    }

    async genreName () {
        this.result.forEach(movie => {
            const genre = this.genres.find(el => el.id === movie.genre_ids[0]);
            movie.genre = genre;
        });
    }
}