export default class Favourite {
    constructor () {
        this.items = [];
    }

    addFavourite (id, title, genre, poster_img) {
        const item = {
            id, title, genre, poster_img
        }

        this.items.push(item);
        
        return item;
    }

    deleteFavourite (id) {
        const index = this.items.findIndex(el => el.id === id);

        this.items.slice(index, 1);
    }

    isFavourite (id) {
        return this.items.findIndex(el => el.id === id) !== -1;
    }
}