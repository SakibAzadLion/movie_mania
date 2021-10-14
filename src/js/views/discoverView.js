import { elements } from "./base";

export const getGenre = () => elements.genreSelect.value;

export const getSortby = () => elements.sortbySelect.value;

export const clearMovie = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const nothingFound = () => {
    //1) No movie HTML
    const markup = `<p>No Movies Found</p>`;
    
    //2) Insert html to the UI
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (pageActive, page) => `
    <button class="btn-inline ${pageActive === page ? 'btn--active' : ''}" data-goto="${page}">
        <span>${page}</span>
    </button>
`;

const renderButton = (page, numRes, resPerPage) => {
    //1) Insert button html to the UI
    const buttons = [];
    
    //2) Get total page number
    const pages = Math.ceil(numRes / resPerPage);
    
    //3) Get button html
    if (pages > 1) {
        for (let i = 1; i <= pages; i++) {
            let button = createButton(page, i);
            buttons.push(button); //Add button html to buttons
        }
    } 

    //4) Insert button html to the UI
    elements.searchResPages.insertAdjacentHTML('afterbegin', buttons.join(''));
}

const renderMovie = movie => {
    //1) Movie HTML
    const markup = `
        <li class="wow fadeIn">
            <a class="search__result__link" href="#${movie.id}">
                <div class="search__result__fig">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">

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

    //2) Insert markup to the UI
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResult = (movie, page = 1, resPerPage = 12) => {
    //1) Check if there is any movie or not
    if (movie.length > 0) {
        //2) Count movies per page
        const start = (page - 1) * resPerPage;
        const end = page * resPerPage;

        //3) Render movies
        movie.slice(start, end).forEach(renderMovie);

        //4) Render pagination buttons
        renderButton(page, movie.length, resPerPage);
    } else {
        //5) If there is no movie display nothing found
        nothingFound();
    }
}