import { elements } from "./base";

export const clearMovie = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const createButton = (page) => `
    <button class="btn-inline" data-goto="${page}">
        <span>${page}</span>
    </button>
`;

const renderButton = (page, numRes, resPerPage) => {
    const buttons = [];
    
    const pages = Math.ceil(numRes / resPerPage);
    
    if(pages > 1) {
        for(let i = 1; i <= pages; i++) {
            let button = createButton(i);
            buttons.push(button);
        }
    } 

    elements.searchResPages.insertAdjacentHTML('afterbegin', buttons.join(''));
}

const renderMovie = movie => {
    const markup = `
        <li>
            <a class="search__result__link" href="#${movie.id}">
                <div class="search__result__fig">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path ? movie.poster_path : movie.backdrop_path}" alt="${movie.title}">

                    <div class="search__result__rating">
                        <i class="material-icons">star</i>
                        <p class="imdb__rating">${movie.vote_average.toFixed(1)}</p>
                    </div>
                </div>
                <div class="search__result__data">
                    <div class="search__result__name">${movie.title}</div>
                    <div class="search__result__genre">${movie.genre.name}</div>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResult = (movie, page = 1, resPerPage = 12) => {
    //Render Result Of Page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    movie.slice(start, end).forEach(renderMovie);

    renderButton(page, movie.length, resPerPage);
}


// popularity: 536.593
// vote_count: 1068
// video: false
// poster_path: "/db32LaOibwEliAmSL2jjDF6oDdj.jpg"
// id: 181812
// adult: false
// backdrop_path: "/dCB7d4l0mfpsISZvr6aPE2z5QF6.jpg"
// original_language: "en"
// original_title: "Star Wars: The Rise of Skywalker"
// genre_ids: (3) [28, 12, 878]
// title: "Star Wars: The Rise of Skywalker"
// vote_average: 6.7
// overview: "The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins."
// release_date: "2019-12-18"
// genre: {id: 28, name: "Action"}