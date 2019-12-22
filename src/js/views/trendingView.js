import { elements } from './base';

export const clearResult = () => {
    elements.trendingList.innerHTML = '';
}

const renderMovie = movie => {
    const markup = `
        <li class="bounce">
            <a class="trending__link" href="#${movie.id}">
                <figure class="trending__fig">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                </figure>
                <div class="trending__data">
                    <h4 class="trending__name">${movie.title}</h4>
                    <p class="trending__author">${movie.genre.name}</p>
                </div>
            </a>
        </li>
    `;

    elements.trendingList.insertAdjacentHTML('beforeend', markup);
}

export const renderResult = movies => {
    movies.forEach(renderMovie);
}


// popularity: 608.26
// vote_count: 614
// video: false
// poster_path: "/db32LaOibwEliAmSL2jjDF6oDdj.jpg"
// id: 181812
// adult: false
// backdrop_path: "/dCB7d4l0mfpsISZvr6aPE2z5QF6.jpg"
// original_language: "en"
// original_title: "Star Wars: The Rise of Skywalker"
// genre_ids: (3) [28, 12, 878]
// title: "Star Wars: The Rise of Skywalker"
// vote_average: 6.8
// overview: "The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins."
// release_date: "2019-12-18"
// genre: {id: 28, name: "Action"}