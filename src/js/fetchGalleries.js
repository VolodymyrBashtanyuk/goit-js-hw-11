
import axios from "axios";


const perPage = 40;

 async function fetchImage(name, page) {

    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '29112900-b21ef4ae161236dc81924b64f';
    const filterUrl = 'image_type=photo&orientation=horizontal&safesearch=true';

    const REQUEST_URL = `${BASE_URL}?key=${KEY}&${filterUrl}&q=${name}&page=${page}&per_page=${perPage}`;

    const fetchRequest = await axios.get(REQUEST_URL);
    const responce = await fetchRequest.data;
    return responce;
};

export { fetchImage, perPage };