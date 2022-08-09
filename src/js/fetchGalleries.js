// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '29112900-b21ef4ae161236dc81924b64f';
// const REQUEST_URL = `${BASE_URL}?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

// let page = 1;

export default class GallerisApiService {
    constructor() {
        this.name = '';
        this.page = 1;
    }

    async fetchImage() {
        const BASE_URL = 'https://pixabay.com/api/';
        const KEY = '29112900-b21ef4ae161236dc81924b64f';
        const REQUEST_URL = `${BASE_URL}?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${this.name}&page=${this.page}&per_page=20`;

        const fetchRequest = await fetch(REQUEST_URL);
        const responce = await fetchRequest.json();
        this.incrimentPage();
        return responce.hits;
    };

    incrimentPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    }

    get nameImage() {
        return this.name;
    }

    set nameImage(newName) {
        this.name = newName;
    }
}
