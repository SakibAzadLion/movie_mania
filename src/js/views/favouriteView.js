import { elements } from './base';

export const toggleFavouriteBtn = isLiked => {
    const iconString = isLiked ? 'favorite' : 'favorite_border';

    document.querySelector('.favourite__movie').textContent = iconString;
}

export const renderFavourite = favourite => {
    const markup = `
        <li>
            <a class="favourite__link" href="#${favourite.id}">
                <figure class="favourite__fig">
                    <img src="https://image.tmdb.org/t/p/w200${favourite.poster_img}" alt="${favourite.title}">
                </figure>
                <div class="favourite__data">
                    <h4 class="favourite__name">${favourite.title}</h4>
                    <p class="favourite__author">${favourite.genre}</p>
                </div>
                <div class="favourite__close">
                <i class="material-icons">close</i>
                </div>
            </a>
        </li>    
    `;

    elements.favouriteList.insertAdjacentHTML('beforeend', markup);
}

export const deleteFavourite = id => {
    const favorite = document.querySelector(`.favourite__link[href="#${id}"]`).parentElement;
    console.log(favorite);
    favorite.parentElement.removeChild(favorite);
}