import { elements } from './base';

export const clearResult = () => {
    elements.trendingList.innerHTML = '';
    elements.trendingPages.innerHTML = '';
}

const createButton = (page, type, isDisabled) => `
    <button class="btn-inline" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <i class="material-icons">keyboard_arrow_${type === 'prev' ? 'left' : 'right'}</i>
    </button>
`;

const createButtonDisabled = (type, isDisabled) => `
    <button class="btn-inline  ${isDisabled ? 'btn--disabled' : ''}" >
        <i class="material-icons">keyboard_arrow_${type === 'prev' ? 'left' : 'right'}</i>
    </button>
`;

const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        button = `
            ${createButtonDisabled('prev', true)}
            ${createButton(page, 'next', false)}
        `;
    }else if (page < pages) {
        button = `
            ${createButton(page, 'prev', false)}
            ${createButton(page, 'prev', false)}
        `;
    }else if (page === pages && pages > 1) {
        button = `
            ${createButton(page, 'prev', false)}
            ${createButtonDisabled('next', true)}
        `;
    }

    elements.trendingPages.insertAdjacentHTML('afterbegin', button);
}

const renderMovie = movie => {
    const markup = `
        <li class="wow fadeIn">
            <a class="trending__link" href="#${movie.id}">
                <figure class="trending__fig">
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
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

export const renderResult = (movies, page = 1, resPerPage = 10) => {
    //Render Result Of Page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    movies.slice(start, end).forEach(renderMovie);

    //Render Pagination Buttons
    renderButton(page, movies.length, resPerPage);
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