// import { fetchImage } from './fetchGalleries';
import GalleriesApi from './fetchGalleries'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import '../css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const galleries = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more')
loadButton.classList.add('ishidden');

// const heightCard = galleries.firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: 300 * 2,
//   behavior: "smooth",
// });

const galleriesApi = new GalleriesApi();

searchForm.addEventListener('submit', onSearchForm);
loadButton.addEventListener('click', onLoadButton);

async function responseData() {
    try {
        const hits = await galleriesApi.fetchImage();
        insertGalleries(hits);
    } catch (error) {
        console.log(error);
    }
};

 function onSearchForm(e) {
    e.preventDefault();

    galleriesApi.nameImage = e.currentTarget.elements.searchQuery.value;
    if (galleriesApi.nameImage === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }
    responseData();
    galleriesApi.resetPage();
    clearGalleries(); 
    loadButton.classList.remove('ishidden');

};


function insertGalleries(list) {
    const imagesItem = galleriesList(list);
    // console.log(list)
    // Notiflix.Notify.success(`Hooray! We found ${list.totalHits} images.`);
    galleries.insertAdjacentHTML('beforeend', imagesItem);
}

const galleriesList = (list) => list.reduce((acc, items) => acc + imagesMarkup(items), '');

function imagesMarkup(data) {
    const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = data;
    
return `<div class='photo-card'>
  <a href='${largeImageURL}'>
  <img src='${webformatURL}' alt='${tags}' loading='lazy' width='300' height='200' />
  </a>
  <div class='info'>
    <p class='info-item'>
      <b>Likes</b>${likes}
    </p>
    <p class='info-item'>
      <b>Views</b>${views}
    </p>
    <p class='info-item'>
      <b>Comments</b>${comments}
    </p>
    <p class='info-item'>
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div> `
};

new SimpleLightbox( '.gallery a', {captionSelector: 'img', }).refresh();
// let gallery = new SimpleLightbox('.photo-card a');
// gallery.on('show.simplelightbox', function () {
// 	// Do something…
//     gallery.open('.photo-card a');
// });
console.log(new SimpleLightbox('.photo-card  a'));

function onLoadButton() {
   responseData()
};

const clearGalleries = () => galleries.innerHTML = '';



