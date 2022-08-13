import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = null;

const createLightBox = () => {
    lightbox = new SimpleLightbox('.gallery a', {
        captionSelector: 'img',
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    })
};
const refresh = () => lightbox.refresh();

export default {refresh, createLightBox }