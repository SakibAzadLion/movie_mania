import { elements } from './base';

export const toggleFavouriteBtn = isFavourite => {
    //1) Favourite icon name
    const iconString = isFavourite ? 'favorite' : 'favorite_border';

    //2) Change icon on UI based of favourite or not
    document.querySelector('.favourite__movie').textContent = iconString;
}

export const toggleVisibility = numFavourite => {
    if (numFavourite > 0) {
        document.querySelector('.favourite__field').style.visibility = 'visible';
        document.querySelector('.favourite__field').classList.add('wow');
        document.querySelector('.favourite__field').classList.add('fadeIn');
        
    } else {
        document.querySelector('.favourite__field').style.visibility = 'hidden';
        document.querySelector('.favourite__field').classList.remove('wow');
        document.querySelector('.favourite__field').classList.remove('fadeIn');

    }
}

export const renderFavourite = favourite => {
    //1) Favourite HTML
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
            </a>
        </li>    
    `;

    //2) Insert favourite html to the UI
    elements.favouriteList.insertAdjacentHTML('beforeend', markup);
}

export const deleteFavourite = id => {
    //1) Select delete item
    const favorite = document.querySelector(`.favourite__link[href="#${id}"]`).parentElement;
    
    //2) Remove item from UI
    favorite.parentElement.removeChild(favorite);
}