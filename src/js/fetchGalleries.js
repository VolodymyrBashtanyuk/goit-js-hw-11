
import axios from "axios";


const PERPAGE = 40;

 async function fetchImage(name, page) {

    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '29112900-b21ef4ae161236dc81924b64f';
    const FILTERURL = 'image_type=photo&orientation=horizontal&safesearch=true';

    const REQUEST_URL = `${BASE_URL}?key=${KEY}&${FILTERURL}&q=${name}&page=${page}&per_page=${PERPAGE}`;

    const fetchRequest = await axios.get(REQUEST_URL);
    const response = fetchRequest.data;
    return response;
};

export { fetchImage, PERPAGE };