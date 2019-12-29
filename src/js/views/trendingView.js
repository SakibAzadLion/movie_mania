import { elements } from './base';

export const getInput = () => elements.trendingSelect.value.toLowerCase().replace(' ', '_');

export const clearResult = () => {
    elements.trendingList.innerHTML = '';
    elements.trendingPages.innerHTML = '';
}

const createButton = (page, type) => `
    <button class="btn-inline" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <i class="material-icons">keyboard_arrow_${type === 'prev' ? 'left' : 'right'}</i>
    </button>
`;

const createButtonDisabled = (type) => `
    <button class="btn-inline btn--disabled" >
        <i class="material-icons">keyboard_arrow_${type === 'prev' ? 'left' : 'right'}</i>
    </button>
`;

const renderButton = (page, numResults, resPerPage) => {
    //1) Get total page number
    const pages = Math.ceil(numResults / resPerPage);

    //2) Get button html
    let button;
    if (page === 1 && pages > 1) {
        button = `
            ${createButtonDisabled('prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'prev')}
        `;
    } else if (page === pages && pages > 1) {
        button = `
            ${createButton(page, 'prev')}
            ${createButtonDisabled('next', true)}
        `;
    }

    //3) Insert button html to the UI
    elements.trendingPages.insertAdjacentHTML('afterbegin', button);
}

const renderMovie = movie => {
    //1) Movie HTML
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

    //2) Insert markup to the UI
    elements.trendingList.insertAdjacentHTML('beforeend', markup);
}

export const renderResult = (movies, page = 1, resPerPage = 10) => {
    //1) Count movies per page 
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    //2) Render movies
    movies.slice(start, end).forEach(renderMovie);

    //3) Render pagination buttons
    renderButton(page, movies.length, resPerPage);
}