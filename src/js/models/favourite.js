export default class Favourite {
    constructor () {
        this.items = [];
    }

    addFavourite (id, title, genre, poster_img) {
        //1) Create favourite item object
        const item = {
            id, title, genre, poster_img
        }
        
        //2) Push item to the items array
        this.items.push(item);

        //3) Update local storage
        this.persistData();
        
        //4) Return item object
        return item;
    }

    deleteFavourite (id) {
        //1) Get index
        const index = this.items.findIndex(el => el.id === id);

        //2) Remove from item array
        this.items.splice(index, 1);
        
        //3) Update local storage
        this.persistData();
    }

    isFavourite (id) {
        return this.items.findIndex(el => el.id === id) !== -1;
    }

    numFavourite () {
        return this.items.length;
    }

    persistData () {
        //1) Add data to the local storage
        localStorage.setItem('favourite', JSON.stringify(this.items));
    }

    readStorage () {
        //1) Read data from local storage
        const storage = JSON.parse(localStorage.getItem('favourite'));

        //2) Add storage data to items array
        this.items = storage;
    }
}