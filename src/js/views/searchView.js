import { elements } from "./base";

export const clearMovie = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const createButton = (pageActive, page) => `
    <button class="btn-inline-search ${pageActive === page ? 'btn--active' : ''}" data-gotopage="${page}">
        <span>${page}</span>
    </button>
`;

const renderButton = (page, numRes, resPerPage) => {
    const buttons = [];
    
    const pages = Math.ceil(numRes / resPerPage);
    
    if(pages > 1) {
        for(let i = 1; i <= pages; i++) {
            let button = createButton(page, i);
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
                    <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : './img/unknown.jpg'}" alt="${movie.title}">

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