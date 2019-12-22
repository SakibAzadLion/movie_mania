import Trending from './models/Trending';
import { elements } from './views/base';

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
    const region = elements.trendingRegion.textContent.toLowerCase().replace(' ', '_');
    console.log(region);
    
    //2) New Trending Object And Add To The State
    state.trending = new Trending(region);

    //3) Prepare UI For Module

    //4) Search For Movie
    state.trending.getMovie();

    //5) Render Movie To The UI

}

window.addEventListener('load', controlTrending);
elements.trendingRegion.addEventListener('change', controlTrending);

