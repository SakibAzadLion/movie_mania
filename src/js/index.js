import Trending from './models/Trending';
import { elements, renderLoader, clearLoader } from './views/base';
import * as trendingView from './views/trendingView';

/** Global state of the app
 * - Trending object
 */
const state = {};
window.s = state;

/**
 * Trending Controler
 */
const controlTrending = async () => {
    //1) Get Region
    const region = elements.trendingSelect.value.toLowerCase().replace(' ', '_');
    console.log(region);
    
    //2) New Trending Object And Add To The State
    state.trending = new Trending(region);

    //3) Prepare UI For Module
    trendingView.clearResult();
    renderLoader(elements.trendingList);

    //4) Search For Movie
    await state.trending.getMovie();
    await state.trending.getGenres();
    state.trending.genreName();

    //Clear Loader
    clearLoader(elements.trendingList);
    //5) Render Movie To The UI
    trendingView.renderResult(state.trending.result);

}

window.addEventListener('load', controlTrending);
elements.trendingSelect.addEventListener('change', controlTrending);

