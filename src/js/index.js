import Trending from './models/Trending';
import Movie from './models/Movie';
import Discover from './models/Discover';
import Search from './models/Search';
import Favourite from './models/Favourite';
import { elements, renderLoader, clearLoader } from './views/base';
import * as trendingView from './views/trendingView';
import * as movieView from './views/movieView';
import * as discoverView from './views/discoverView';
import * as searchView from './views/searchView';
import * as favouriteView from './views/favouriteView';


/** Global state of the app
 * - TRENDING OBJECT
 */
const state = {};


/**
 * TRENDING CONTROLER
 */
const controlTrending = async () => {
    //1) Get trend value
    const trend = trendingView.getInput();
    
    if (trend) {
        //2) New trending object and add to the state
        state.trending = new Trending(trend);

        //3) Prepare UI for module
        trendingView.clearResult();
        renderLoader(elements.trendingList);

        try {
            //4) Search for movie and get genre name
            await state.trending.getMovies();
            await state.trending.getGenres();
            state.trending.getGenreName();
        
            //Clear Loader
            clearLoader(elements.trendingList);

            //5) Render movies to the UI
            trendingView.renderResult(state.trending.result);
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Control Trending');
        }
    }
}


//Trending controler event listeners
window.addEventListener('load', controlTrending);
elements.trendingSelect.addEventListener('change', controlTrending);

//Trending controler btn event listeners
elements.trendingPages.addEventListener('click', e => {
    //1) Get btn
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        //2) Get btn page number
        const goToPage = parseInt(btn.dataset.goto);

        if (!goToPage) return; //If no button then return
        
        //3) Prepare btn UI for module
        trendingView.clearResult();
        window.scrollTo(0, 0); //Scroll top page top

        //4) Render movies with button
        trendingView.renderResult(state.trending.result, goToPage);
    }
})


/**
 * MOVIE CONTROLER
 */
const controlMovie = async () => {
    //1) Get movie ID
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        //2) New trending object and add to the state
        state.movie = new Movie(id);
        
        //3) Prepare UI for module
        movieView.toggleOverlay(true);
        renderLoader(elements.movie);

        try {
            //4) Search for movie and calculate star rating
            await state.movie.getResult();
            state.movie.calcRating();
        
            //Clear Loader
            clearLoader(elements.movie);

            //5) Render movie to the UI
            movieView.renderMovie(state.movie, state.favourite.isFavourite(id));
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Control Movie');
        }        
    }
}

//Movie controler event listeners
window.addEventListener('hashchange', controlMovie);
window.addEventListener('load', controlMovie);

/**
 * CLOSE MOVIE CONTROLER
 */
const closeMovie = () => {
    //1) Clear movie HTML
    movieView.clearMovie();

    //2) Prepare UI for module
    movieView.toggleOverlay(false);

    //2) Return to home without reloading
    window.location.hash = '';
}

//Close controler event listener
elements.movie.addEventListener('click', e => {
    if(e.target.matches('.btn__close, .btn__close *')) {
        closeMovie();
    }
});



/**
 * DISCOVER CONTROLER
 */
const controlDiscover = async () => {
    //1) Get genre and sortby value
    const genre = discoverView.getGenre();
    const sortby = discoverView.getSortby();
    
    if (genre && sortby) {        
        //2) New discover object and add to the state
        state.discover = new Discover(genre, sortby);

        //3) Prepare UI for module
        discoverView.clearMovie();
        renderLoader(elements.searchResList);

        try {
            //4) Search for discover movie
            await state.discover.getResult();
            state.discover.genreName(state.trending.genres);
            state.discover.filterMovieGenre();

            //Clear loader
            clearLoader(elements.searchResList);

            //5) Render movie to the UI
            discoverView.renderResult(state.discover.result);            
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Control Discover');
        }        
    }    
}

//Discover controler event listeners
window.addEventListener('load', controlDiscover);
elements.genreSelect.addEventListener('change', controlDiscover);
elements.sortbySelect.addEventListener('change', controlDiscover);
elements.logoBox.addEventListener('click', controlDiscover); //On logo click call discover controler
elements.logoBoxPhone.addEventListener('click', controlDiscover); //On logo Mobile click call discover controler

//Discover controler btn event listeners
elements.searchResPages.addEventListener('click', e => {
    //1) Get btn
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        //2) Get btn page number
        const goToPage = parseInt(btn.dataset.goto);

        //3) Prepare btn UI for module
        discoverView.clearMovie();
        window.scrollTo(0, 0); //Scroll top page top

        //4) Render movies with button
        discoverView.renderResult(state.discover.result, goToPage);
    }
});


/**
 * SEARCH CONTROLER
 */
const controlSearch = async () => {
    //1) Get search query
    const query = searchView.getInput();
    
    if (query) {        
        //2) New search object and add to the state
        state.search = new Search(query);
        
        //3) Prepare UI for module
        searchView.clearMovie();
        searchView.toggleSelects(true);
        renderLoader(elements.searchResList);
        
        
        try {
            //4) Search for Movie
            await state.search.getResult();
            state.search.genreName(state.trending.genres);
            
            //Clear loader
            clearLoader(elements.searchResList);

            //5) Render movies to the UI
            searchView.renderResult(state.search.result);
        } catch (error) {
            console.log(error);
            alert('Something Wrong In Control Search');
        }        
    } else {
        //6) Prepare UI for module
        searchView.toggleSelects(false);
        
        //7) If no query then go to discover movies
        controlDiscover();
    }    
}

//Search controler event listeners
elements.search.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//Search controler btn event listeners
elements.searchResPages.addEventListener('click', e => {
    //1) Get btn
    const btnSearch = e.target.closest('.btn-inline-search');
    
    if (btnSearch) {
        //2) Get btn page number
        const goToPage = parseInt(btnSearch.dataset.gotopage);

        //3) Prepare btn UI for module
        searchView.clearMovie();
        window.scrollTo(0, 0); //Scroll top page top

        //4) Render movies with button
        searchView.renderResult(state.search.result, goToPage);
    }
});


/**
 *FAVOURITE CONTROLER
 */
const controlFavourite = () => {
    //1) Create a new favourite if there is none
    if (!state.favourite) state.favourite = new Favourite();    

    //2) Get id of current movie
    const currentId = state.movie.id;
    
    //3) If theres no like then add else remove
    if (!state.favourite.isFavourite(currentId)) {
        //4) Add favourite to the state
        const currentItem = state.favourite.addFavourite(
            currentId,
            state.movie.title,
            state.movie.genres[0],
            state.movie.poster
        );

        //5) Toggle favourite button
        favouriteView.toggleFavouriteBtn(true);

        //6) Render favourite to the UI
        favouriteView.renderFavourite(currentItem);
    } else {
        //7) Remove favourite from the state
        state.favourite.deleteFavourite(currentId);

        //8) Toggle favourite button
        favouriteView.toggleFavouriteBtn(false);

        //9) Remove favourite from the UI
        favouriteView.deleteFavourite(currentId);
    }

    //10) Toggle favourite menu icon
    favouriteView.toggleVisibility(state.favourite.numFavourite());
}

//Favourite controler event listener
elements.movie.addEventListener('click', e => {
    if (e.target.matches('.favourite__movie')) {
        controlFavourite();
    }
});


/**
 *PREPARE CODE ON LOAD
 */
window.addEventListener('load', e => {
    //1) Create a new favourite
    state.favourite = new Favourite();
    
    //2) Reading data from local storage
    state.favourite.readStorage();
    
    //3) Toggle Menu
    favouriteView.toggleVisibility(state.favourite.numFavourite());

    //4) Redering favourite movie
    state.favourite.items.forEach(favourite => favouriteView.renderFavourite(favourite));
});















