export default class Favourite {
    constructor () {
        this.items = [];
    }

    addFavourite (id, title, genre, poster_img) {
        const item = {
            id, title, genre, poster_img
        }

        this.items.push(item);
        this.persistData();
        
        return item;
    }

    deleteFavourite (id) {
        const index = this.items.findIndex(el => el.id === id);

        this.items.splice(index, 1);

        this.persistData();
    }

    isFavourite (id) {
        return this.items.findIndex(el => el.id === id) !== -1;
    }

    numFavourite () {
        return this.items.length;
    }

    persistData () {
        localStorage.setItem('favourite', JSON.stringify(this.items));
    }

    readStorage () {
        const storage = JSON.parse(localStorage.getItem('favourite'));

        this.items = storage;
    }
}