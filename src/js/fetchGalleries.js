// import Notiflix from 'notiflix';

import axios from "axios";


export default class GallerisApiService {
    constructor() {
        this.name = '';
        this.page = 1;
        this.perPage = 40;
        this.message = "We're sorry, but you've reached the end of search results."
    }

    async fetchImage() {
        const BASE_URL = 'https://pixabay.com/api/';
        const KEY = '29112900-b21ef4ae161236dc81924b64f';
        const REQUEST_URL = `${BASE_URL}?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${this.name}&page=${this.page}&per_page=${this.perPage}`;

        const fetchRequest = await axios.get(REQUEST_URL);
        const responce = await fetchRequest.data;
        this.incrimentPage(); 
        return responce;
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
