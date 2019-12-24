import { elements } from "./base";

export const toggleOverlay = type => {
    if(type === 'add') {
        elements.movie.classList.add('overlay');
        document.body.style.overflow = 'hidden';
    } else if (type === 'remove') {
        elements.movie.classList.remove('overlay');
        document.body.style.overflow = 'scroll';
    }
}

export const renderMovie = movie => {
    const markup = `
        <!-- Movie Info -->
        <button class="btn__close">
            <i class="material-icons">close</i>
        </button>
        <div class="movie__info movie__info__overlay">
            <!-- Close Button -->
            <!-- Movie Full Content -->
            <div class="movie__content">
                <!-- Movie Poster -->
                <div class="movie__poster">
                    <div class="movie__fig">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster}">
                    </div>
                    <div class="movie__trailer">
                        <a href="https://youtu.be/${movie.trailer}" class="btn__trailer" target="_blank">Watch Trailer<i class="material-icons">arrow_right</i></a>
                    </div>
                </div> <!-- Movie Poster-->
                <!-- Movie Data -->
                <div class="movie__data">
                    <h3 class="movie__name">${movie.title}</h3>
                    <div class="movie__det">
                        <p class="movie__watchtime">${movie.runtime}</p>
                        <p class="movie__generes">action, comedy, fight</p>
                    </div>
                    <div class="movie__rating">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_border</i>
                    </div>
                    <div class="movie__desc">
                        <p>${movie.overview}</p>
                    </div>
                </div> <!-- Movie Data -->
            </div c> <!-- Movie Main Content -->
            <div class="movie__cast">
                <h3>CAST</h3>
                <ul class="movie__cast__list">
                    <li>
                        <div class="cast__fig">
                            <img src="https://picsum.photos/200/300" alt="cast 1">
                        </div>
                        <div class="cast__data">
                            <h4 class="cast__name">Passengers</h4>
                            <p class="cast__role">Action</p>
                        </div>
                    </li> <!-- Li End -->
                </ul> <!-- Movie Cast List -->
            </div> <!-- Movie Cast -->
        </div> <!-- Movie Info -->
    `;

    elements.movie.insertAdjacentHTML('afterbegin', markup);
}