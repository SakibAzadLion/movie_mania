import Trending from './models/Trending';
import { elements, renderLoader, clearLoader } from './views/base';
import * as trendingView from './views/trendingView';
import * as movieView from './views/movieView';
import Movie from './models/Movie';

/** Global state of the app
 * - Trending object
 */
const state = {};
window.s = state;

/**
 * Trending Controler
 */
const controlTrending = async () => {
    //1) Get Trend
    const trend = elements.trendingSelect.value.toLowerCase().replace(' ', '_');
    // console.log(region);
    
    if (trend) {

        //2) New Trending Object And Add To The State
        state.trending = new Trending(trend);

        //3) Prepare UI For Module
        trendingView.clearResult();
        renderLoader(elements.trendingList);

        try {
            //4) Search For Movie
            await state.trending.getMovie();
            await state.trending.getGenres();
            state.trending.genreName();
        
            //Clear Loader
            clearLoader(elements.trendingList);
            //5) Render Movie To The UI
            trendingView.renderResult(state.trending.result);
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Control Trending');
        }

    }

}

window.addEventListener('load', controlTrending);
elements.trendingSelect.addEventListener('change', controlTrending);

elements.trendingPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); //Get Button

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto); //Get Button Page
        trendingView.clearResult(); //Clear Result
        trendingView.renderResult(state.trending.result, goToPage); //Render Result
    }
})


/**
 * Movie Controler
 */
const controlMovie = async () => {
    //1) Get ID
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        //2) New Trending Object And Add To The State
        state.movie = new Movie(id);

        //3) Prepare UI For Module
        movieView.toggleOverlay('add');
        renderLoader(elements.movie);

        try {
            //4) Search For Movie
            await state.movie.getResults();
            state.movie.calcRating();
        
            //Clear Loader
            clearLoader(elements.movie);
            //5) Render Movie To The UI
            movieView.renderMovie(state.movie);
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Control Movie');
        }
        
    }
}

/**
 * Close Movie On Click
 */
const closeMovie = () => {
    //1) Clear Movie Html
    movieView.clearMovie();

    //2) Remove Overlay Class Add Scroll Bar
    movieView.toggleOverlay('remove');

    //2) Return To The Home Ure
    window.location = window.location.origin;
}


elements.movie.addEventListener('click', e => {
    console.log(e.target);
    if(e.target.matches('.btn__close, .btn__close *')) {
        closeMovie();
    }
});


window.addEventListener('hashchange', controlMovie);





