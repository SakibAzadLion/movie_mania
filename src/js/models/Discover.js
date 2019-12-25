import axios from 'axios';
import { key } from '../config';

export default class Discover {
    constructor(genre, sortby) {
        this.genre = genre;
        this.sortby = sortby;
    }

    async getResult() {
        let results = [];

        for(let i = 1; i <= 4; i++) {
            const res = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=${this.sortby}.desc&page=${i}`);
            results.push(...res.data.results);
        }

        this.result = results;
    }

    genreName (genres) {
        this.result.forEach(movie => {
            if(movie.genre_ids[0]) {
                const genre = genres.find(el => el.id === movie.genre_ids[0]);
                movie.genre = genre;
            }
        });
    }

    filterMovieGenre() {
        if (this.genre === 'all') return;

        const resArr = this.result.filter(movie => movie.genre.name.toLowerCase() === this.genre.toLowerCase());          
        this.result = resArr;
    }
}