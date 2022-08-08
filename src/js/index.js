import { fetchImage } from './fetchCountries';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import '../css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const galleries = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearchForm)



function onSearchForm(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.searchQuery.value;
    rensponseGalleriesImages(inputValue);
};

async function rensponseGalleriesImages(images) {
    try {
        const data = await fetchImage(images);
        const result = await data;
        return result;
    } catch (error) {
        console.log(error)
    }
}

// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div> 