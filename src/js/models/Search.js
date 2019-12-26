import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        const res = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${this.query}&page=1&include_adult=false`);
        this.result = res.data.results;
    }

    genreName (genres) {
        this.result.forEach(movie => {
            if(movie.genre_ids[0]) {
                const genre = genres.find(el => el.id === movie.genre_ids[0]);
                movie.genre = genre;            
            }else {
                movie.genre = {id: 0, name:''};
            }
        });
    }

    filterMovieGenre() {
        if (this.genre === 'all') return;

        const resArr = this.result.filter(movie => movie.genre.name.toLowerCase() === this.genre.toLowerCase());          
        this.result = resArr;
    }
}