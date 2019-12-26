import Trending from './models/Trending';
import Movie from './models/Movie';
import Discover from './models/Discover';
import Search from './models/Search';
import Favourite from './models/favourite';
import { elements, renderLoader, clearLoader } from './views/base';
import * as trendingView from './views/trendingView';
import * as movieView from './views/movieView';
import * as discoverView from './views/discoverView';
import * as searchView from './views/searchView';
import * as favouriteView from './views/favouriteView';


/** Global state of the app
 * - Trending object
 */
const state = {};

state.isSearched = false;
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
    window.location.hash = '';
}


elements.movie.addEventListener('click', e => {
    if(e.target.matches('.btn__close, .btn__close *')) {
        closeMovie();
    }
});

window.addEventListener('hashchange', controlMovie);


/**
 * Discover Controler
 */
const controlDiscover = async () => {
    //1) Get Genre And Sortby
    const genre = elements.genreSelect.value;
    const sortby = elements.sortbySelect.value;
    state.isSearched = false;
    
    if (genre && sortby) {
        
        //2) New Discover Object And Add To The State
        state.discover = new Discover(genre, sortby);

        //3) Prepare UI For Module
        discoverView.clearMovie();
        renderLoader(elements.searchResList);

        try {
            //4) Search For Discover Movie
            await state.discover.getResult();
            state.discover.genreName(state.trending.genres);
            state.discover.filterMovieGenre();

            //Clear Loader
            clearLoader(elements.searchResList);
            //5) Render Movie To The UI
            discoverView.renderResult(state.discover.result);
            
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Control Discover');
        }
        
    }
    
}

window.addEventListener('load', controlDiscover);
elements.genreSelect.addEventListener('change', controlDiscover);
elements.sortbySelect.addEventListener('change', controlDiscover);


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        discoverView.clearMovie();
        discoverView.renderResult(state.discover.result, goToPage);
    }
});


/**
 * Search Controler
 */
const controlSearch = async () => {
    //1) Get Genre And Sortby
    const query = elements.searchField.value;
    state.isSearched = true;
    
    if (query) {        
        //2) New Search Object And Add To The State
        state.search = new Search(query);
        
        //3) Prepare UI For Module
        searchView.clearMovie();
        renderLoader(elements.searchResList);
        elements.sortbySelect.setAttribute('disabled', 'disabled');
        elements.genreSelect.setAttribute('disabled', 'disabled');
        elements.sortbySelect.closest('.select').classList.add('select--disabled');
        elements.genreSelect.closest('.select').classList.add('select--disabled');
        try {
            //4) Search For Discover Movie
            await state.search.getResult();
            state.search.genreName(state.trending.genres);
            
            //Clear Loader
            clearLoader(elements.searchResList);
            //5) Render Movie To The UI
            searchView.renderResult(state.search.result);
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Control Search');
        }

    } else {
        elements.sortbySelect.removeAttribute('disabled');
        elements.genreSelect.removeAttribute('disabled');
        elements.sortbySelect.closest('.select').classList.remove('select--disabled');
        elements.genreSelect.closest('.select').classList.remove('select--disabled');
        controlDiscover(); // If No Query Then Go To Discover
    }
    
}

elements.searchResPages.addEventListener('click', e => {
    const btnSearch = e.target.closest('.btn-inline-search');
    
    if (btnSearch) {
        const goToPage = parseInt(btnSearch.dataset.gotopage);
        searchView.clearMovie();
        searchView.renderResult(state.search.result, goToPage);
    }
});

elements.search.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


/**
 *FAVOURITE CONTROLER
 */
const controlFavourite = () => {
    //Create a new Favourite if there is none
    if (!state.favourite) state.favourite = new Favourite();

    const currentId = state.movie.id;
    
    console.log(state.favourite.isFavourite(currentId));
    if (!state.favourite.isFavourite(currentId)) {
        //Add Favourite To The State
        const currentItem = state.favourite.addFavourite(
            currentId,
            state.movie.title,
            state.movie.genres[0],
            state.movie.poster
        );

        //Toggle Favourite Button
        favouriteView.toggleFavouriteBtn(true);
        //Render Favourite To The UI
        favouriteView.renderFavourite(currentItem);
    } else {
        //Remove Favourite To The State
        state.favourite.deleteFavourite(currentId);

        //Toggle Favourite Button
        favouriteView.toggleFavouriteBtn(false);

        //Remove Favourite To The UI
        favouriteView.deleteFavourite(currentId);
    }
    //User has not liked the current recipe
}


elements.movie.addEventListener('click', e => {
    if (e.target.matches('.favourite__movie')) {
        controlFavourite();
    }
});
















