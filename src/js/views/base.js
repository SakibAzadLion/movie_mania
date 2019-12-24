export const elements = {
    trendingSelect: document.querySelector('.trending__select'),
    trendingList: document.querySelector('.trending__list'),
    trendingPages: document.querySelector('.trending__pages'),
    movie: document.querySelector('.movie'),
}

const elementsString = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="loadingio-spinner-eclipse-f5lx3lsu7nu ${elementsString.loader}">
            <div class="ldio-1mokd24f7k">
                <div></div>
            </div>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = parent => {
    const loader = parent.querySelector(`.${elementsString.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}