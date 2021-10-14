import axios from 'axios';
import { key } from '../config';

export default class Discover {
    constructor(genre, sortby) {
        this.genre = genre;
        this.sortby = sortby;
    }

    async getResult() {
        //1) Array for storing 4 api call data
        let results = [];

        //2) Fetching data from api 4 timer to get 80 movies
        for (let i = 1; i <= 4; i++) {
            try {
                const res = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=${this.sortby}.desc&page=${i}`);
    
                results.push(...res.data.results); //Add data to results array
            } catch (error) {
                console.log(error);
                alert('Something Wrong In Discover JS (getResult)');
            }
        }
        
        //3) Save movies into array
        this.result = results;
    }

    genreName (genres) {
        this.result.forEach(movie => {
            if (movie.genre_ids[0]) {
                const genre = genres.find(el => el.id === movie.genre_ids[0]);
                movie.genre = genre;            
            } else {
                movie.genre = {id: 0, name:''};
            }
        });
    }

    filterMovieGenre() {
        //1) Don't fiter if genre is all
        if (this.genre === 'all') return;

        //2) Fiter if there is a genre
        const resArr = this.result.filter(movie => movie.genre.name.toLowerCase() === this.genre.toLowerCase());    
        
        //3) Save movies into array
        this.result = resArr;
    }
}