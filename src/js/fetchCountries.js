const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29112900-b21ef4ae161236dc81924b64f';
const REQUEST_URL = `${BASE_URL}?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

async function fetchImage(name) {

    const fetchRequest = await fetch(`${REQUEST_URL}&q=${name}`)
    const responce = await fetchRequest.json()
    return responce;
};
    


export  { fetchImage };