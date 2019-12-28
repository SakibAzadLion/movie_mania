import axios from 'axios';
import { key } from '../config';

export default class Movie {
    constructor (id) {
        this.id = id;
    }

    async getResults() {
        const res = await axios(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${key}&language=en-US&append_to_response=credits,videos`);
        console.log(res.data);
        this.title = res.data.title;
        this.imdb_rating = res.data.vote_average;
        this.runtime = res.data.runtime;
        this.overview = res.data.overview;
        this.poster = res.data.poster_path;
        this.trailer = res.data.videos.results.length > 0 ? res.data.videos.results[0].key : '404';
        this.cast = res.data.credits.cast.slice(0, 9);
        this.genres = res.data.genres.map(el => el.name);
    }

    calcRating() {
        const rating = (this.imdb_rating / 10) * 5;
        this.rating = rating;
    }
}


// adult: false
// backdrop_path: "/5BwqwxMEjeFtdknRV792Svo0K1v.jpg"
// belongs_to_collection: null
// budget: 87500000
// genres: (5) [{…}, {…}, {…}, {…}, {…}]
// homepage: "https://www.foxmovies.com/movies/ad-astra"
// id: 419704
// imdb_id: "tt2935510"
// original_language: "en"
// original_title: "Ad Astra"
// overview: "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown."
// popularity: 499.933
// poster_path: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"
// production_companies: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
// production_countries: (3) [{…}, {…}, {…}]
// release_date: "2019-09-17"
// revenue: 127175902
// runtime: 123
// spoken_languages: (2) [{…}, {…}]
// status: "Released"
// tagline: "The answers we seek are just outside our reach"
// title: "Ad Astra"
// video: false
// vote_average: 6.1
// vote_count: 1396
// credits:
// cast: (29) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// crew: (72) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// __proto__: Object
// videos:
// results: Array(6)
// 0: {id: "5cf81bfb92514153b7b9e733", iso_639_1: "en", iso_3166_1: "US", key: "P6AaSMfXHbA", name: "Official Trailer #1", …}
// 1: {id: "5d313d7c326c1900101eba51", iso_639_1: "en", iso_3166_1: "US", key: "nxi6rtBtBM0", name: "Official Trailer #2", …}
// 2: {id: "5d894d21d9f4a6000e4dc169", iso_639_1: "en", iso_3166_1: "US", key: "stOVFXuyyWQ", name: "Moon Rover", …}
// 3: {id: "5d894d5179b3d4002782dd61", iso_639_1: "en", iso_3166_1: "US", key: "Nvb9cDDFHtk", name: "Lima Project", …}
// 4: {id: "5d894d5cd9f4a600204da4ea", iso_639_1: "en", iso_3166_1: "US", key: "ykC_wu6ffOU", name: "Antenna", …}
// 5: {id: "5d894d8a79b3d4001f832e8d", iso_639_1: "en", iso_3166_1: "US", key: "t6g0dsQzfqY", name: "Official Trailer #3", …}