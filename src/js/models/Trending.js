import axios from 'axios';
import { key } from '../config';

export default class Trending {
    constructor (region = 'popular') {
        this.region = region;
    }

    async getMovie () {
        const res = await axios(`https://api.themoviedb.org/3/movie/${this.region}?api_key=${key}&language=en-US&page=1`);
        console.log(res.data);
        this.result = res.data;
    }
}